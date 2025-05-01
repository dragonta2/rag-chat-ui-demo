// app/api/chat/route.logic.test.ts

import { createMockResponse } from "./route.logic";

describe("createMockResponse", () => {
  it("正しくモック返答と出典を返す", () => {
    const data = createMockResponse("こんにちは");

    expect(data.reply).toContain("こんにちは");
    expect(data.sources).toHaveLength(1);
    expect(data.sources[0].title).toBe("OpenAI API ドキュメント");
  });
});
