import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../../common/utils/testingUtils";
vi.mock("../hooks/useAuthMode.ts");
import { useAuthMode } from "../hooks/useAuthMode";

import AuthHelperCaption from "./AuthHelperCaption";

describe("AuthHelperCaption", () => {
  const mockedSetToggleMode = vi.fn();
  const mockedResetForm = vi.fn();

  it("should render correct text when isSignUpMode is false", () => {
    vi.mocked(useAuthMode).mockReturnValue({
      isSignUpMode: false,
      setToggleMode: mockedSetToggleMode,
    });

    renderWithProviders(<AuthHelperCaption resetForm={mockedResetForm} />);

    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });

  it("should render correct text when isSignUpMode is true", () => {
    vi.mocked(useAuthMode).mockReturnValue({
      isSignUpMode: true,
      setToggleMode: mockedSetToggleMode,
    });

    renderWithProviders(<AuthHelperCaption resetForm={mockedResetForm} />);

    expect(screen.getByText("Already have an account?")).toBeInTheDocument();
    expect(screen.getByText("Log In")).toBeInTheDocument();
  });

  it("should call toggleModeHandler and resetForm when toggleMode is called", () => {
    vi.mocked(useAuthMode).mockReturnValue({
      isSignUpMode: false,
      setToggleMode: mockedSetToggleMode,
    });

    renderWithProviders(<AuthHelperCaption resetForm={mockedResetForm} />);

    const toggleModeHandler = screen.getByText("Sign Up");
    toggleModeHandler.click();

    expect(mockedSetToggleMode).toHaveBeenCalled();
    expect(mockedResetForm).toHaveBeenCalled();
  });
});
