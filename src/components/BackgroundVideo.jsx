// src/components/BackgroundVideo.jsx
export default function BackgroundVideo() {
  return (
    <div className="fixed inset-0 z-0 h-full w-full overflow-hidden">
      {/* L'overlay pour le contraste et le côté Premium */}
      <div className="absolute inset-0 z-10 bg-black/25" /> 

      <video
        className="h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/desert-sunset.mp4" type="video/mp4" />
        Ton navigateur ne supporte pas la lecture de vidéos.
      </video>
    </div>
  );
}
