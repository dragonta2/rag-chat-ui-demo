// app/components/ChatBox.tsx

"use client";

import { useState } from "react";
import SourceList, { Source } from "./SourceList";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatBox() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);

    const newMessages: ChatMessage[] = [
      ...messages,
      { role: "user" as const, content: input },
    ];

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      const aiMessage: ChatMessage = {
        role: "assistant" as const,
        content: data.reply,
      };

      setMessages([...newMessages, aiMessage]);
      setSources(data.sources || []);
    } catch (err) {
      console.error("エラー:", err);
    } finally {
      setInput("");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white text-black shadow-lg rounded-lg p-4">
      <div className="space-y-2 mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`text-sm p-2 rounded ${
              msg.role === "user" ? "bg-blue-100 text-right" : "bg-gray-100"
            }`}
          >
            <strong>{msg.role === "user" ? "You" : "AI"}:</strong> {msg.content}
          </div>
        ))}
      </div>

      <div className="flex">
        <input
          type="text"
          placeholder="知りたいことを入力してください"
          className="flex-1 border border-gray-300 rounded-l p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-r disabled:opacity-50"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>

      <SourceList sources={sources} />
    </div>
  );
}
