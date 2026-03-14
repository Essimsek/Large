import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import PostCard from "../PostCard";
import type { Post } from "@/sanity.types";

afterEach(cleanup);

vi.mock("@/sanity/lib/image", () => ({
    urlForImage: () => ({
        width: () => ({
            height: () => ({
                url: () => "https://example.com/image.jpg",
            }),
            url: () => "https://example.com/image.jpg",
        }),
    }),
}));

const mockPost = {
    _id: "post-1",
    _type: "post",
    _createdAt: "2025-01-15T10:00:00Z",
    _updatedAt: "2025-01-15T10:00:00Z",
    _rev: "rev-1",
    title: "Test Post Title",
    description: "This is a test description",
    category: "Technology",
    views: 42,
    likes: 7,
    slug: "test-post-title",
    author: {
        _id: "author-1",
        username: "testuser",
        name: "Test User",
        image: undefined,
    },
} as unknown as Post;

describe("PostCard", () => {
    it("renders the post title", () => {
        render(<PostCard post={mockPost} />);
        expect(screen.getByText("Test Post Title")).toBeInTheDocument();
    });

    it("renders the description", () => {
        render(<PostCard post={mockPost} />);
        expect(
            screen.getByText("This is a test description")
        ).toBeInTheDocument();
    });

    it("renders the category", () => {
        render(<PostCard post={mockPost} />);
        expect(screen.getByText("Technology")).toBeInTheDocument();
    });

    it("renders author username", () => {
        render(<PostCard post={mockPost} />);
        expect(screen.getByText("testuser")).toBeInTheDocument();
    });

    it("renders view and like counts", () => {
        render(<PostCard post={mockPost} />);
        expect(screen.getByText("42")).toBeInTheDocument();
        expect(screen.getByText("7")).toBeInTheDocument();
    });

    it("renders a link to the full post", () => {
        render(<PostCard post={mockPost} />);
        const link = screen.getByText("Read more");
        expect(link.closest("a")).toHaveAttribute(
            "href",
            "/testuser/test-post-title"
        );
    });
});
