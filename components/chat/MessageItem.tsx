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
        "animate-fade-in",
        isUser ? "justify-end" : "justify-start",
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
          <span className="text-white font-bold">{name}</span>
        </div>

        {/* 吹き出し 本体 */}
        <div
          className={clsx(
            "px-4 py-2 rounded-lg shadow",
            isUser
              ? "bg-blue-500 text-white self-end rounded-tr-none"
              : "bg-gray-200 text-gray-900 self-start rounded-tl-none"
          )}
        >

          {/* 本文 */}
          <p className="text-sm whitespace-pre-wrap">{content}</p>

        </div>
      </div>
    </div>
  );
}
