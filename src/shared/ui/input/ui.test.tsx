import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { Input } from "./ui";

describe("Input tests", () => {
  afterEach(() => {
    cleanup();
  });

  test("Input render", () => {
    render(<Input placeholder="Test" />);

    const input = screen.getByPlaceholderText(/test/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass(/input/i);
  });

  test("Input have error"),
    () => {
      render(<Input placeholder="Test" error="Error" />);

      const input = screen.getByPlaceholderText(/test/i);
      expect(input).toHaveClass(/error/i);
      expect(input).toHaveTextContent(/error/i);
    };

  test("Input dont have error", () => {
    render(<Input placeholder="Test" />);

    const input = screen.getByPlaceholderText(/test/i);
    expect(input).not.toHaveClass(/error/i);
    expect(input).not.toHaveTextContent(/error/i);
  });
});
