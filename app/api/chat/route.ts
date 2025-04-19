import { NextResponse } from "next/server";

export async function POST(req: Request) {

  const { message } = await req.json();

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
      temperature: 0.7,
    }),
  });

  const openaiResponse = await res.json();

  // レスポンスのJSONを確認｜console
  console.log("OpenAIからのレスポンス:", openaiResponse);

  // OpenAIのエラーで choices が存在していない｜APIキー間違い or 使用上限超え
  if (!openaiResponse.choices) {
    console.error("OpenAIのレスポンスに choices が含まれていません:", openaiResponse);
  }


  const reply = openaiResponse?.choices?.[0]?.message?.content || null;

  return NextResponse.json({
    reply: reply,
    sources: [],
  });

}

