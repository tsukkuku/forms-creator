import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { Dropdown } from "./ui";

const onCloseMock = vi.fn();
const onClickMock = vi.fn();

describe("Dropdown tests", () => {
  afterEach(() => {
    cleanup();
    onCloseMock.mockClear();
    onClickMock.mockClear();
  });

  test("Dropdown render", () => {
    render(
      <Dropdown isOpen onClose={onCloseMock}>
        <Dropdown.Item onClose={onCloseMock}>Test</Dropdown.Item>
      </Dropdown>
    );

    const dropdown = screen.getByTestId("dropdown");
    expect(dropdown).toHaveClass(/active/i);
  });
  test("Dropdown not render", () => {
    render(
      <Dropdown isOpen={false} onClose={onCloseMock}>
        <Dropdown.Item onClose={onCloseMock}>Test</Dropdown.Item>
      </Dropdown>
    );

    const dropdown = screen.getByTestId("dropdown");
    expect(dropdown).not.toHaveClass(/active/i);
  });
  test("Dropdown not close when click inside", () => {
    render(
      <Dropdown isOpen onClose={onCloseMock}>
        <Dropdown.Item onClose={onCloseMock}>Test</Dropdown.Item>
      </Dropdown>
    );

    const dropDown = screen.getByTestId("dropdown");

    fireEvent.click(dropDown);

    expect(onCloseMock).not.toHaveBeenCalled();
  });
  test("Dropdown closes when click outside", () => {
    render(
      <>
        <div>Text</div>
        <Dropdown isOpen onClose={onCloseMock}>
          <Dropdown.Item onClose={onCloseMock}>Test</Dropdown.Item>
        </Dropdown>
      </>
    );

    const outside = screen.getByText(/text/i);

    fireEvent.mouseDown(outside);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
  test("Dropdown.Items calls onClick and onClose", () => {
    render(
      <Dropdown.Item onClose={onCloseMock} onClick={onClickMock}>
        Text
      </Dropdown.Item>
    );

    const dropDown = screen.getByText(/text/i);

    fireEvent.click(dropDown);

    expect(onClickMock).toHaveBeenCalledTimes(1);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
    expect(onClickMock).toHaveBeenCalledBefore(onCloseMock);
  });
});
