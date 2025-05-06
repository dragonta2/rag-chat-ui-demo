// components/chat/MessageInput.stories.tsx

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { MessageInput } from "./MessageInput";

const meta: Meta<typeof MessageInput> = {
  title: "Chat/MessageInput",
  component: MessageInput,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MessageInput>;

// ✅ useState を Story の外に出したコンポーネントにまとめる
const MessageInputWithState = () => {
  const [input, setInput] = useState("");
  return (
    <MessageInput
      input={input}
      onInputChange={setInput}
      onSubmit={() => alert(`送信: ${input}`)}
      loading={false}
    />
  );
};

export const Default: Story = {
  render: () => <MessageInputWithState />,
};

export const Loading: Story = {
  render: () => (
    <MessageInput
      input={"ロード中..."}
      onInputChange={() => {}}
      onSubmit={() => {}}
      loading={true}
    />
  ),
};
