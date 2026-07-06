#!/bin/bash
# Hook PostToolUse : eslint --fix sur les fichiers JS/JSX modifiés.
# Sort silencieusement si Node n'est pas installé sur la machine.
command -v node >/dev/null 2>&1 || exit 0

file=$(python3 -c "import json,sys; print(json.load(sys.stdin).get('tool_input',{}).get('file_path',''))" 2>/dev/null)
[ -z "$file" ] && exit 0

case "$file" in
  *.js|*.jsx|*.cjs|*.mjs) ;;
  *) exit 0 ;;
esac

# Retrouver la racine du repo (où vit node_modules) depuis le fichier édité
dir=$(dirname "$file")
while [ "$dir" != "/" ]; do
  if [ -x "$dir/node_modules/.bin/eslint" ]; then
    cd "$dir" && ./node_modules/.bin/eslint --fix "$file" >/dev/null 2>&1
    break
  fi
  dir=$(dirname "$dir")
done
exit 0
