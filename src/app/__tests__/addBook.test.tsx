import React from "react";
import { render, screen } from "@testing-library/react";
import AddBook from "../add-book/page";
import { beforeEach, expect, it, vi, describe } from "vitest";
import "@testing-library/jest-dom";

vi.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: vi.fn(),
      refresh: vi.fn(),
    };
  },
}));

describe("AddBook Component - Unit Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render all form fields", () => {
    render(<AddBook />);
    expect(screen.getByRole('textbox', { name: /title/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /author/i })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: /pages/i })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: /rating/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /isbn/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /description/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /genre/i })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: /published year/i })).toBeInTheDocument();
  });

  it("should render submit button and back link", () => {
    render(<AddBook />);
    expect(screen.getByRole('button', { name: /add book/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back to library/i })).toBeInTheDocument();
  });


});