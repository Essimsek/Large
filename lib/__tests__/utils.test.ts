import { describe, it, expect } from "vitest";
import { formatDate, cn, estimateReadingTime } from "../utils";

describe("formatDate", () => {
    it("formats a date string to en-US short format", () => {
        const result = formatDate("2025-01-15T10:00:00Z");
        expect(result).toBe("Jan 15, 2025");
    });

    it("formats a Date object", () => {
        const result = formatDate(new Date("2024-12-25"));
        expect(result).toContain("2024");
        expect(result).toContain("Dec");
    });
});

describe("cn", () => {
    it("merges class names", () => {
        const result = cn("px-2 py-1", "px-4");
        expect(result).toContain("px-4");
        expect(result).toContain("py-1");
        expect(result).not.toContain("px-2");
    });

    it("handles conditional classes", () => {
        const result = cn("base", false && "hidden", "extra");
        expect(result).toBe("base extra");
    });

    it("returns empty string for no input", () => {
        const result = cn();
        expect(result).toBe("");
    });
});

describe("estimateReadingTime", () => {
    it("returns 1 min for short content", () => {
        const content = JSON.stringify({
            type: "doc",
            content: [
                {
                    type: "paragraph",
                    content: [{ type: "text", text: "Hello world" }],
                },
            ],
        });
        expect(estimateReadingTime(content)).toBe(1);
    });

    it("calculates correctly for longer content", () => {
        const words = Array(400).fill("word").join(" ");
        const content = JSON.stringify({
            type: "doc",
            content: [
                {
                    type: "paragraph",
                    content: [{ type: "text", text: words }],
                },
            ],
        });
        expect(estimateReadingTime(content)).toBe(2);
    });

    it("returns 1 for invalid JSON", () => {
        expect(estimateReadingTime("not json")).toBe(1);
    });

    it("returns 1 for empty content", () => {
        const content = JSON.stringify({ type: "doc", content: [] });
        expect(estimateReadingTime(content)).toBe(1);
    });

    it("handles nested nodes", () => {
        const content = JSON.stringify({
            type: "doc",
            content: [
                {
                    type: "bulletList",
                    content: [
                        {
                            type: "listItem",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [
                                        { type: "text", text: "Item one" },
                                    ],
                                },
                            ],
                        },
                        {
                            type: "listItem",
                            content: [
                                {
                                    type: "paragraph",
                                    content: [
                                        { type: "text", text: "Item two" },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        });
        expect(estimateReadingTime(content)).toBe(1);
    });
});
