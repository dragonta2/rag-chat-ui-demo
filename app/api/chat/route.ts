export async function POST(req: Request) {
  const { message } = await req.json();

  return Response.json({
    reply: `「${message}」に関するダミーの回答です。`,
    sources: [
      {
        title: "Next.js公式ドキュメント",
        url: "https://nextjs.org/docs",
        snippet: "App Routerは、pagesディレクトリの代替として導入され..."
      },
      {
        title: "Zenn記事：Next.js 15まとめ",
        url: "https://zenn.dev/xxx",
        snippet: "React Server Componentsとの親和性が高く..."
      }
    ]
  });
}
