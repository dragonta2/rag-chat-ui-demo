import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { ChatBox } from "@/components/chat/ChatBox";

describe("ChatBox", () => {
  beforeEach(() => {
    // fetch をモックして、毎回このレスポンスを返すようにする
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            reply: "AIの返答です",
            sources: [],
          }),
      })
    ) as jest.Mock;
  });

  it("ChatBox がレンダリングされる", () => {
    render(<ChatBox />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
  });

  it("ユーザーがテキストを入力できる", async () => {
    render(<ChatBox />);
    const input = screen.getByRole("textbox");
    await userEvent.type(input, "こんにちは");
    expect(input).toHaveValue("こんにちは");
  });

  it("送信ボタンを押すとメッセージが追加される", async () => {
    render(<ChatBox />);
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /send/i });

    await userEvent.type(input, "こんにちは");
    await userEvent.click(button);

    // メッセージが追加されるまで待つ
    await waitFor(() => {
      expect(screen.getByText("こんにちは")).toBeInTheDocument();
      expect(screen.getByText("AIの返答です")).toBeInTheDocument();
    });
  });
});
