// app/components/chat/ChatBox.tsx

"use client";

import { useState } from "react";
import { MessageList } from "@/components/chat/MessageList";
import { MessageInput } from "@/components/chat/MessageInput";

export type ChatMessage = {

  // roleは、以下のどちらかをここのコンポーネント内でハードコーディングしてセットする（ユーザー or AIの判別用）
  role: "user" | "assistant";
  content: string;
};

export type Source = {
  title: string;
  url: string;
};

export function ChatBox() {

  // userの送信した内容 と AIからの返答がブチこまれる、配列型で定義
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  // 出典情報がブチこまれる、配列型で定義
  const [sources, setSources] = useState<Source[]>([]);

  // 入力されたメッセージを state に追加し、/api/chat へ POST。
  // AIからのレスポンスを受け取って messages に追加、sources に出典リンクを格納。
  // try/catch/finally でエラーハンドリングとローディング制御。
  const handleSubmit = async () => {

    // 空白削除して入力が空文字の場合は、処理終了
    if (!input.trim()) return;

    // userの入力文字列
    const userMessage: ChatMessage = {

      // roleに userをセット
      role: "user",
      content: input.trim(),
    };

    // スプレッド構文で新配列 newMessagesを作成、既存配列 messagesをバラして、Userの入力文字を追加する
    const newMessages = [...messages, userMessage];

    // messagesの状態を更新
    setMessages(newMessages);

    // input要素内の文字列を空にする
    setInput("");

    // ローディング中にする
    setLoading(true);

    // 念のため出典もクリア
    setSources([]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // JSON文字列化して、messagesキーにnewMessages（今までの全メッセージ入り配列）を詰めて、リクエスト送信
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      // APIから返ってきた AIの返答メッセージ
      const aiMessage: ChatMessage = {
        role: "assistant",
        content: data.reply || "（返答が取得できませんでした）",
      };

      // 直前の messagesの状態のものに、APIから返ってきた値を追加する（状態更新）
      setMessages((prev) => [...prev, aiMessage]);

      //出典を入れる
      setSources(data.sources || []);
    } catch (err) {
      console.error("APIエラー:", err);
    } finally {

      // loadingを元に戻す
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full border rounded shadow">

      {/* メッセージ表示エリア全体
        親である ChatBox は状態管理だけ行い、UIは子コンポーネントに任せる。

        「状態を上に持ち、表示を下に任せる」 ＝ Reactの基本設計思想。
      */}
      <MessageList messages={messages} />
        {sources.length > 0 && (
          <div className="border-t px-4 py-2 text-sm text-gray-500 bg-gray-50">
            <div className="mb-1 font-semibold">出典：</div>
            {/* 出典情報の表示部分 */}
            <ul className="list-disc pl-5 space-y-1">
              {sources.map((source, i) => (
                <li key={i}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    {source.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        <MessageInput
          input={input}
          onInputChange={setInput}
          onSubmit={handleSubmit}
          loading={loading}
        />
    </div>
  );
}
