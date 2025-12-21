import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { Textarea } from "./ui";

describe("Textarea tests", () => {
  afterEach(() => {
    cleanup();
  });

  test("render Textarea", () => {
    render(<Textarea placeholder="Test" />);

    const textarea = screen.getByPlaceholderText(/test/i);
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveClass(/textarea/i);
  });
});
