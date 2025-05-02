// app/components/chat/MessageItem.tsx
import clsx from "clsx";

type Props = {
  role: "user" | "assistant";
  content: string;
};

export function MessageItem({ role, content }: Props) {
  const isUser = role === "user";
  const name = isUser ? "User" : "AI";
  const icon = isUser ? "🧑" : "🤖";

  return (
    <div
      className={clsx(
        "w-full",
        "flex",
        isUser ? "justify-end" : "justify-start",
        "animate-fade-in"
      )}
    >
      <div className="flex flex-col items-start max-w-xs">

        {/* 名前・アイコン表示 */}
        <div
          className={clsx(
            "flex items-center mb-1 text-sm text-gray-500"
          )}
        >
          <span className="mr-1">{icon}</span>
          <span>{name}</span>
        </div>

        {/* 吹き出し 本体 */}
        <div
          className={clsx(
            "px-4 py-2 rounded-lg shadow",
            isUser
              ? "bg-blue-500 text-white self-end rounded-br-none"
              : "bg-gray-200 text-gray-900 self-start rounded-bl-none"
          )}
        >

          {/* 本文 */}
          <p className="text-sm whitespace-pre-wrap">{content}</p>

        </div>
      </div>
    </div>
  );
}
