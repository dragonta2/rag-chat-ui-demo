// .storybook/main.ts

import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../components/**/*.stories.@(js|jsx|ts|tsx)"], // ← 必要に応じて調整
  addons: [
    "@storybook/addon-essentials", // controls, actions, docs など全部入り
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {}, // Next.js固有の最適化が入る
  },
  docs: {
    autodocs: true,
  },
};

export default config;
