interface VideoPlayerProps {
  url: string;
}

export const VideoPlayer = ({ url }: VideoPlayerProps) => {
  const embedUrl: string | null = ((): string | null => {
    try {
      const embedUrl: URL = new URL(url.trim());
      return embedUrl.protocol === "https:" &&
        embedUrl.hostname === "www.youtube.com" &&
        embedUrl.pathname.startsWith("/embed/")
        ? embedUrl.toString()
        : null;
    } catch {
      return null;
    }
  })();

  if (!embedUrl) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-xl border border-red-500/30 bg-red-500/5 px-4 text-center text-sm text-red-200">
        Não foi possível carregar o vídeo desta aula.
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-card rounded-xl shadow-2xl shadow-black/40 overflow-hidden border">
      <iframe
        src={embedUrl}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
};
