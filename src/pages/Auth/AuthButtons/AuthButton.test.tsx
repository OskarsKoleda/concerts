import { getAuthControls } from "./utils";
import AuthButtons from "./AuthButtons";
import { renderWithProviders } from "../../../common/utils/testingUtils";

describe("AuthButtons", () => {
  it("should render Login button", () => {
    const { getByRole } = renderWithProviders(<AuthButtons signUp={false} />);
    expect(getByRole("button", { name: "Login" })).toBeInTheDocument();
  });

  it("should render Sign Up button", () => {
    const { getByRole } = renderWithProviders(<AuthButtons signUp={true} />);
    expect(getByRole("button", { name: "Sign Up" })).toBeInTheDocument();
  });
});

describe("getAuthControls", () => {
  it("should return Login configuration when signUp is false", () => {
    const controls = getAuthControls(false);
    expect(controls[0].text).toBe("Login");
    expect(controls[0].id).toBe("btnLogin");
  });
  it("should return Sign Up configuration when signUp is true", () => {
    const controls = getAuthControls(true);
    expect(controls[0].text).toBe("Sign Up");
    expect(controls[0].id).toBe("btnSignUp");
  });
  it("should pass the loading state correctly", () => {
    const controls = getAuthControls(false, true);
    expect(controls[0].loading).toBe(true);
  });
});
