import { afterEach, describe, expect, test, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Button } from "./ui";

const mockFunc = vi.fn();

describe("Button ui component tests", () => {
  afterEach(() => {
    cleanup();
    mockFunc.mockClear();
  });

  test("Render component", () => {
    render(<Button>Hello!</Button>);
    const btn = screen.getByTestId("custom-button");
    expect(btn).toBeInTheDocument();
  });
  test("onClick in Button component", () => {
    render(<Button onClick={mockFunc}>Hello!</Button>);
    const btn = screen.getByTestId("custom-button");
    fireEvent.click(btn);
    expect(btn).toBeInTheDocument();
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });
  test("additional classname for Button component", () => {
    render(<Button className="header-btn">Hello!</Button>);
    const btn = screen.getByTestId("custom-button");
    expect(btn).toHaveClass(/header-btn/i);
  });
  test("Button is disabled when disabled prop", () => {
    render(
      <Button disabled onClick={mockFunc}>
        Hello!
      </Button>
    );
    const btn = screen.getByTestId("custom-button");

    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute("disabled");

    fireEvent.click(btn);
    expect(mockFunc).not.toHaveBeenCalled();
  });
});
