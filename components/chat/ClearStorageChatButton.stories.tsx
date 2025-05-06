import type { Meta, StoryObj } from "@storybook/react";
import { ClearStorageChatButton } from "./ClearStorageChatButton";

const meta: Meta<typeof ClearStorageChatButton> = {
  title: "Chat/ClearStorageChatButton",
  component: ClearStorageChatButton,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ClearStorageChatButton>;

export const Default: Story = {
  args: {
    onClear: () => alert("削除ロジック発火！（ダミー）"),
  },
};
