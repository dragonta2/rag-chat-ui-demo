// app/components/chat/MessageItem.tsx

type Props = {
  role: "user" | "assistant";
  content: string;
};

export function MessageItem({ role, content }: Props) {
  const isUser = role === "user";

  return (
    <div
      className={`p-2 rounded-md max-w-md ${
        isUser ? "bg-blue-100 self-end text-right" : "bg-gray-100 self-start"
      }`}
    >
      <p className="text-sm">{content}</p>
    </div>
  );
}
