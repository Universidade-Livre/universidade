import type { KnipConfig } from "knip";

const config: KnipConfig = {
  ignore: ["scripts/seed/**"],
  ignoreDependencies: ["next-themes"],
  exclude: ["exports", "duplicates"],
  compilers: {
    css: (text: string) => [...text.matchAll(/(?<=@)import[^;]+/g)].join('\n'),
  },
};

export default config;
