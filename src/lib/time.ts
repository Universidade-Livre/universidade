import humanizeDuration from "humanize-duration";

const humanizer = humanizeDuration.humanizer({
  language: "pt",
  units: ["h", "m"],
  round: true,
  spacer: "",
  delimiter: " ",
  languages: {
    pt: {
      h: () => "h",
      m: () => "min",
    },
  },
});

export function formatDuration(seconds: number): string {
  return humanizer(seconds * 1000);
}
