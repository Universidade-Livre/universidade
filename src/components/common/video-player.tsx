interface VideoPlayerProps {
  url: string;
}

export const VideoPlayer = ({ url }: VideoPlayerProps) => {
  const isValidEmbedUrl = (embedUrl: string): boolean => {
    try {
      const parsedUrl: URL = new URL(embedUrl.trim());
      return (
        parsedUrl.protocol === "https:" &&
        parsedUrl.hostname.replace(/^www\./, "") === "youtube.com" &&
        parsedUrl.pathname.startsWith("/embed/")
      );
    } catch {
      return false;
    }
  };

  if (!isValidEmbedUrl(url)) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-xl border border-red-500/30 bg-red-500/5 px-4 text-center text-sm text-red-200">
        Não foi possível carregar o vídeo desta aula.
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-card rounded-xl shadow-2xl shadow-black/40 overflow-hidden border">
      <iframe
        src={url}
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
