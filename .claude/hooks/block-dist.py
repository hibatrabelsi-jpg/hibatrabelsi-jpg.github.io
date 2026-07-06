#!/usr/bin/env python3
"""Hook PreToolUse : bloque les éditions dans dist/ (régénéré par npm run build)."""
import json
import sys

try:
    data = json.load(sys.stdin)
except json.JSONDecodeError:
    sys.exit(0)

path = data.get("tool_input", {}).get("file_path", "")
if "/dist/" in path or path.startswith("dist/"):
    print(
        "dist/ est généré par `npm run build` et sera écrasé au prochain build. "
        "Modifie plutôt les sources dans src/ ou public/.",
        file=sys.stderr,
    )
    sys.exit(2)
