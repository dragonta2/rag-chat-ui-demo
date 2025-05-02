// app/components/chat/MessageList.tsx

// import { ChatMessage } from "@/components/chat/ChatBox";
import { MessageItem } from "@/components/chat/MessageItem";

type Props = {
  messages: ChatMessage[];
};

export function MessageList({ messages }: Props) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      {messages.map((msg, idx) => (
        <MessageItem key={`${msg.role}-${idx}-${msg.content}`} role={msg.role} content={msg.content} />
      ))}
    </div>
  );
}
