export default interface Video {
  snippet: {
    title: string;
    resourceId: {
      videoId: string;
    };
  };
  contentDetails: {
    videoId: string;
  };
}
