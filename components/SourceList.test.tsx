import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SourceList, { Source } from "./SourceList";

describe("SourceList", () => {
  const mockSources: Source[] = [
    {
      title: "OpenAI API ドキュメント",
      url: "https://platform.openai.com/docs",
    },
    {
      title: "Next.js App Router Guide",
      url: "https://nextjs.org/docs/app/building-your-application/routing",
    },
  ];

  it("出典が表示される", () => {
    render(<SourceList sources={mockSources} />);

    expect(screen.getByText(/出典/)).toBeInTheDocument();
    expect(
      screen.getByText("OpenAI API ドキュメント")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Next.js App Router Guide")
    ).toBeInTheDocument();

    expect(screen.getAllByRole("link")).toHaveLength(2);
  });

  it("出典が空なら何も表示されない", () => {
    const { container } = render(<SourceList sources={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
