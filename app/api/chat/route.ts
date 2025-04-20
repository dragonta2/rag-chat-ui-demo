// app/api/chat/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  // ✅ テスト環境のときはモックデータを返す
  if (process.env.NODE_ENV === "test") {
    const { message } = await req.json();

    const reply = `「${message}」へのモック返答`;
    const sources = [
      {
        title: "OpenAI API ドキュメント",
        url: "https://platform.openai.com/docs",
      },
    ];

    return NextResponse.json({ reply, sources });
  }

  // ✅ 通常のOpenAI APIへの接続
  const body = await req.json();
  const messages = body.messages;
  const latestMessage = messages[messages.length - 1]?.content || "";

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

  const sources = [];

  if (/next\.?js/i.test(latestMessage)) {
    sources.push({
      title: "Next.js App Router Guide",
      url: "https://nextjs.org/docs/app/building-your-application/routing",
    });
  }

  if (/openai|api/i.test(latestMessage)) {
    sources.push({
      title: "OpenAI API ドキュメント",
      url: "https://platform.openai.com/docs",
    });
  }

  if (/embedding|ベクトル/i.test(latestMessage)) {
    sources.push({
      title: "LangChain Embeddings 入門",
      url: "https://docs.langchain.com/docs/modules/data_connection/retrievers",
    });
  }

  return NextResponse.json({
    reply,
    sources,
  });
}
