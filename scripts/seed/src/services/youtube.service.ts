import type Video from "@/types/video.interface";

export default class YoutubeService {
  private readonly apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  public getPlaylistId(url: string): string | null {
    return new URL(url).searchParams.get("list");
  }

  public async getVideos(playlistId: string | null): Promise<Video[]> {
    if (!playlistId) {
      return [];
    }

    let pageToken: string | undefined;
    const videos: Video[] = [];
    do {
      const params = new URLSearchParams({
        part: "snippet,contentDetails",
        playlistId,
        key: this.apiKey,
        maxResults: "50",
      });

      if (pageToken) {
        params.set("pageToken", pageToken);
      }

      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?${params}`,
      );

      const data = await response.json();
      videos.push(...(data.items as Video[]));
      pageToken = data.nextPageToken;
    } while (pageToken);
    return videos;
  }

  public async getVideoDurations(
    videoIds: string[],
  ): Promise<Map<string, string>> {
    const durations: Map<string, string> = new Map<string, string>();
    for (let i = 0; i < videoIds.length; i += 50) {
      const chunk: string[] = videoIds.slice(i, i + 50);
      const params = new URLSearchParams({
        part: "contentDetails",
        id: chunk.join(","),
        key: this.apiKey,
      });

      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?${params}`,
      );

      const data = await response.json();
      for (const item of data.items ?? []) {
        durations.set(item.id, item.contentDetails.duration);
      }
    }

    return durations;
  }
}
