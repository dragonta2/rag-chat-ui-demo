// app/components/ChatBox.tsx

"use client";

import { useState } from "react";
import { MessageList } from "@/components/chat/MessageList";
import { MessageInput } from "@/components/chat/MessageInput";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatBox() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (!input.trim()) return;

    const newMessage: ChatMessage = {
      role: "user",
      content: input.trim(),
    };

    setMessages([...messages, newMessage]);
    setInput("");

    // 仮：アシスタント返信（デモ用）
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "これはAIの返答です。",
        },
      ]);
    }, 500);
  };

  return (
    <div className="flex flex-col h-full border rounded shadow">
      <MessageList messages={messages} />
      <MessageInput
        input={input}
        onInputChange={setInput}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
