import { render, screen } from "@testing-library/react";
import ChatBox from "./ChatBox";

test("ChatBox がレンダリングされる", () => {
  render(<ChatBox />);
  expect(screen.getByRole("textbox")).toBeInTheDocument();
});
