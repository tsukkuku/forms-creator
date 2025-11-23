import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { Modal } from "./ui";

const onCloseMock = vi.fn();

describe("Modal component tests", () => {
  afterEach(() => {
    cleanup();
    onCloseMock.mockClear();
  });

  test("check render Modal", () => {
    render(
      <Modal isOpen title="Test title" onClose={onCloseMock}>
        Modal
      </Modal>
    );

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveClass(/modal/i, /active/i);
    expect(modal).toHaveTextContent(/test/i);
    expect(modal).toHaveTextContent(/modal/i);
  });
  test("not render Modal", () => {
    render(
      <Modal isOpen={false} title="Test title" onClose={onCloseMock}>
        Modal
      </Modal>
    );

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
    expect(modal).not.toHaveClass(/active/i);
    expect(modal).not.toHaveTextContent(/modal/i);
  });
  test("click on to empty space for close Modal", () => {
    render(
      <Modal isOpen={true} title="Test title" onClose={onCloseMock}>
        Modal
      </Modal>
    );

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveClass(/modal/i, /active/i);
    expect(modal).toHaveTextContent(/modal/i);

    fireEvent.click(modal);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
  test("click on the Modal content", () => {
    render(
      <Modal isOpen={true} title="Test title" onClose={onCloseMock}>
        Modal
      </Modal>
    );

    const modal = screen.getByText(/modal/i);
    const modalOverlay = screen.getByTestId("modal");

    fireEvent.click(modal);

    expect(onCloseMock).not.toHaveBeenCalled();

    fireEvent.click(modalOverlay);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
  test("click on the close icon for close Modal", () => {
    render(
      <Modal isOpen={true} title="Test title" onClose={onCloseMock}>
        Modal
      </Modal>
    );

    const closeIcon = screen.getByTestId("closeIcon");

    fireEvent.click(closeIcon);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
