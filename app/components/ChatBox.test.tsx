import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ChatBox from "./ChatBox";

describe("ChatBox", () => {

  it("ChatBoxコンポーネントが表示される", () => {
    render(<ChatBox />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();

    const buttonElement = screen.getByRole("button", { name: /send/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it("ユーザーがテキストを入力できる", async () => {
    render(<ChatBox />);
    const inputElement = screen.getByRole("textbox");
    await userEvent.type(inputElement, "こんにちは");

    expect(inputElement).toHaveValue("こんにちは");
  });

});
