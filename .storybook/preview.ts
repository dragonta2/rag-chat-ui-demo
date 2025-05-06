// .storybook/preview.ts

import type { Preview } from '@storybook/react'

import "../styles/globals.css"; // Tailwindを Storybook側で適用

export const parameters = {
  layout: "centered", // or 'fullscreen'
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;