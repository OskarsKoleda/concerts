import { render, screen } from "@testing-library/react";

import ButtonsLayout from "./ButtonsLayout";
import { toVisibleControl } from "./utils";

import type { ControlPayload } from "../../common/types/appTypes";

describe("ButtonsLayout", () => {
  const controls: ControlPayload[] = [
    { id: "btn1", text: "Button 1", visible: true, loading: false },
    { id: "btn2", text: "Button 2", visible: false, loading: false },
    { id: "btn3", text: "Button 3", loading: true },
  ];

  it("renders only visible controls as LoadingButton", () => {
    render(<ButtonsLayout controls={controls} />);
    expect(screen.getByText("Button 1")).toBeInTheDocument();
    expect(screen.getByText("Button 3")).toBeInTheDocument();
    expect(screen.queryByText("Button 2")).not.toBeInTheDocument();
  });

  it("passes props to LoadingButton", () => {
    render(<ButtonsLayout controls={controls} />);
    const button = screen.getByText("Button 1").closest("button");
    expect(button).toHaveAttribute("id", "btn1");
  });

  it("renders children inside layout", () => {
    render(
      <ButtonsLayout controls={controls}>
        <span>Child 1</span>
        <button>Child Button</button>
      </ButtonsLayout>,
    );

    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child Button")).toBeInTheDocument();
  });

  it("renders children after visible controls", () => {
    render(
      <ButtonsLayout controls={controls}>
        <span>Child 2</span>
      </ButtonsLayout>,
    );

    const allGridItems = screen.getAllByText(/Button|Child/);

    expect(allGridItems[0]).toHaveTextContent("Button 1");
    expect(allGridItems[1]).toHaveTextContent("Button 3");
    expect(allGridItems[2]).toHaveTextContent("Child 2");
  });

  it("renders nothing if controls is empty and no children", () => {
    render(<ButtonsLayout controls={[]} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders children even if controls is empty", () => {
    render(
      <ButtonsLayout controls={[]}>
        <button>Only Child</button>
      </ButtonsLayout>,
    );

    expect(screen.getByText("Only Child")).toBeInTheDocument();
  });

  it("does not render invisible controls", () => {
    const invisibleControls: ControlPayload[] = [{ id: "btnA", text: "Invisible", visible: false }];
    render(<ButtonsLayout controls={invisibleControls} />);
    expect(screen.queryByText("Invisible")).not.toBeInTheDocument();
  });

  it("renders controls with undefined visible (defaults to true)", () => {
    const controlsWithUndefinedVisible: ControlPayload[] = [
      { id: "btnX", text: "Default Visible" },
    ];

    render(<ButtonsLayout controls={controlsWithUndefinedVisible} />);
    expect(screen.getByText("Default Visible")).toBeInTheDocument();
  });

  it("renders multiple children", () => {
    render(
      <ButtonsLayout controls={[]}>
        <span>Child A</span>
        <span>Child B</span>
      </ButtonsLayout>,
    );

    expect(screen.getByText("Child A")).toBeInTheDocument();
    expect(screen.getByText("Child B")).toBeInTheDocument();
  });
});

describe("toVisibleControl", () => {
  it("returns rest of payload when visible is true", () => {
    const payload: ControlPayload = { visible: true, text: "Test", id: "1" };
    expect(toVisibleControl(payload)).toEqual({ text: "Test", id: "1" });
  });

  it("returns rest of payload when visible is undefined (defaults to true)", () => {
    const payload: ControlPayload = { text: "Test", id: "2" };
    expect(toVisibleControl(payload)).toEqual({ text: "Test", id: "2" });
  });

  it("returns null when visible is false", () => {
    const payload: ControlPayload = { visible: false, text: "Test", id: "3" };
    expect(toVisibleControl(payload)).toBeNull();
  });

  it("returns null when visible is explicitly set to false and other fields exist", () => {
    const payload: ControlPayload = { visible: false, text: "Hidden", id: "4", loading: false };
    expect(toVisibleControl(payload)).toBeNull();
  });
});
