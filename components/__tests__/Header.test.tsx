import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Header from "../Header";

afterEach(cleanup);

describe("Header", () => {
    it("renders the title", () => {
        render(<Header title="Test Title" />);
        expect(screen.getByText("Test Title")).toBeInTheDocument();
    });

    it("renders inside an h1 element", () => {
        render(<Header title="Heading" />);
        const heading = screen.getByRole("heading", { level: 1 });
        expect(heading).toHaveTextContent("Heading");
    });

    it("renders with the header-title class", () => {
        render(<Header title="Styled" />);
        const heading = screen.getByRole("heading", { level: 1 });
        expect(heading).toHaveClass("header-title");
    });
});
