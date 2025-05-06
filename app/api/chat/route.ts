// app/api/chat/route.ts

// [クライアントからメッセージが来る]
// ↓
// [このAPIで OpenAIに投げる]
// ↓
// [OpenAIの返答を受け取る]
// ↓
// [簡単な出典判定をする]
// ↓
// [クライアントに返す（JSON）]

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  // クライアントからリクエスト送信されたJSON文字列をパースしてJSオブジェクトに戻す
  const body = await req.json();
  // ChatBox から来たメッセージ配列の中身を取り出す
  const messages = body.messages;

  // リクエスト送信
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",

    // 認証とレスポンスデータの形式
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    // JSON文字列化してリクエスト送る
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      // 送られてきたmessages配列の中身
      messages,
      temperature: 0.7,
    }),
  });

  // 結果を受け取って整形
  // OpenAI から返ってきた レスポンスの中身を JSON に変換
  const openaiResponse = await res.json();

// ガード式
// openaiResponse?. 	もし openaiResponse が null / undefined なら undefined を返して止める
// .choices?. 	choices が無い（例：API失敗時）でもエラーを出さずに止まる
// [0]?.　	配列の1番目 （通常GPTの返答は1件目） を取り出すが、無ければ止まる
// .message?.content 	 最終的に message.content からテキストを抽出（でも無ければ止まる）

  // GPTの返答を安全に取り出し、無ければ空文字でフォールバックする
  const reply = openaiResponse?.choices?.[0]?.message?.content || "";

  // 🔍 簡易出典判定（AIの返答からキーワードを見て追加）
  const sources = [];

  if (/next\.?js/i.test(reply)) {
    sources.push({
      title: "Next.js App Router Guide",
      url: "https://nextjs.org/docs/app/building-your-application/routing",
    });
  }

  if (/openai|api/i.test(reply)) {
    sources.push({
      title: "OpenAI API ドキュメント",
      url: "https://platform.openai.com/docs",
    });
  }

  if (/embedding|ベクトル/i.test(reply)) {
    sources.push({
      title: "LangChain Embeddings 入門",
      url: "https://docs.langchain.com/docs/modules/data_connection/retrievers",
    });
  }

  // クライアント（＝ブラウザ側）に、JSON形式で返答と出典を返す
  return NextResponse.json({ reply, sources });
}
