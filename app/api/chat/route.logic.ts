// app/api/chat/route.logic.ts

export function createMockResponse(message: string) {
  const reply = `「${message}」へのモック返答`;
  const sources = [
    {
      title: "OpenAI API ドキュメント",
      url: "https://platform.openai.com/docs",
    },
  ];
  return { reply, sources };
}
