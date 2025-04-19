// app/api/chat/route.ts

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
      messages,
      temperature: 0.7,
    }),
  });

  const openaiResponse = await res.json();
  const reply = openaiResponse?.choices?.[0]?.message?.content || "";

  // 仮の出典データを返す
  const sources = [
    {
      title: "OpenAI API ドキュメント",
      url: "https://platform.openai.com/docs",
    },
    {
      title: "Next.js App Router Guide",
      url: "https://nextjs.org/docs/app/building-your-application/routing",
    },
  ];

  return NextResponse.json({
    reply,
    sources,
  });
}
