import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import { Accordion } from "./ui";

describe("Accordion component tests", () => {
  afterEach(() => {
    cleanup();
  });

  test("Render component", () => {
    render(<Accordion title="Section 1">Text</Accordion>);
    const acc = screen.getByText(/section 1/i);
    expect(acc).toBeInTheDocument();
  });
  test("opening accordion", () => {
    render(<Accordion title="Section 1">Text</Accordion>);
    const acc = screen.getByText(/section 1/i);

    fireEvent.click(acc);
    expect(screen.getByText(/text/i)).toBeInTheDocument();
  });
  test("accordion closes", () => {
    render(<Accordion title="Section 1">Text</Accordion>);
    const acc = screen.getByText(/section 1/i);

    fireEvent.click(acc);
    expect(screen.getByTestId("accordion")).toHaveClass(/showcontent/i);

    fireEvent.click(acc);
    expect(screen.getByTestId("accordion")).not.toHaveClass(/showcontent/i);
  });
  test("click on the content will not close the accordion", () => {
    render(<Accordion title="Section 1">Text</Accordion>);
    const acc = screen.getByText(/section 1/i);
    const text = screen.getByTestId("accordion");

    fireEvent.click(acc);
    expect(text).toHaveClass(/showcontent/i);

    fireEvent.click(text);
    expect(text).toHaveClass(/showcontent/i);
  });
});
