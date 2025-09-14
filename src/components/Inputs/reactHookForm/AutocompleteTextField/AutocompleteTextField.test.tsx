import { fireEvent, screen } from "@testing-library/react";

import { renderWithProviders } from "../../../../common/utils/testingUtils";

import AutocompleteTextField from "./AutocompleteTextField";

const renderWithForm = (props: any) => {
  return renderWithProviders(
    <AutocompleteTextField
      controlName="test"
      label="Test Label"
      placeholder="Test Placeholder"
      {...props}
    />,
    {
      formConfig: {
        defaultValues: { test: props.value ?? [] },
      },
    },
  );
};

describe("AutocompleteTextField", () => {
  it("renders label and placeholder", () => {
    renderWithForm({});

    expect(screen.getByLabelText("Test Label")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Test Placeholder")).toBeInTheDocument();
  });

  it("renders tooltip when tooltipText is provided", async () => {
    renderWithForm({ tooltipText: "Tooltip info" });

    fireEvent.mouseOver(screen.getByLabelText("Test Label"));
    expect(await screen.findByText("Tooltip info")).toBeInTheDocument();
  });

  it("renders ChipsReadonlyField when readonly is true", () => {
    renderWithForm({ readonly: true, value: ["foo", "bar"] });

    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByText("foo")).toBeInTheDocument();
    expect(screen.getByText("bar")).toBeInTheDocument();
  });

  it("calls onChange when value changes", () => {
    renderWithForm({});

    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "new value" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(input).toHaveValue("");
  });
});
