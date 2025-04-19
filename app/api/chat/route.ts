import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const messages = body.messages;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: messages, // 会話履歴をそのまま投げる！
      temperature: 0.7,
    }),
  });

  const openaiResponse = await res.json();

  const reply = openaiResponse?.choices?.[0]?.message?.content || "";

  return NextResponse.json({
    reply,
    sources: [],
  });
}
