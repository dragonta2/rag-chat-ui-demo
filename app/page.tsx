// app/page.tsx

import { ChatBox } from "@/components/chat/ChatBox";

export default function HomePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">ホーム</h1>
      <ChatBox />
    </div>
  )
}
