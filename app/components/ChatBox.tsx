"use client";

import { useState } from "react";
import SourceList, { Source } from "./SourceList";

export default function ChatBox() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) {
        throw new Error(`API Error: ${res.status}`);
      }

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        `You: ${input}`,
        `AI: ${data.reply || "No response"}`,
      ]);
      setSources(data.sources || []);
    } catch (err) {
      console.error("送信エラー:", err);
      setMessages((prev) => [
        ...prev,
        `You: ${input}`,
        `AI: すまん、応答できなかったぜ。`,
      ]);
      setSources([]);
    } finally {
      setInput("");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white text-black shadow-lg rounded-lg p-4">
      <div className="space-y-2 mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className="text-sm bg-gray-100 p-2 rounded">
            {msg}
          </div>
        ))}
      </div>

      <div className="flex">
        <input
          type="text"
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
