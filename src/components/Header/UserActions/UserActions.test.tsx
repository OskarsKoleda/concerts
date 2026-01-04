import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect } from "vitest";

import { useLogout } from "../../../api/auth/useLogout.ts";
import { renderWithProviders } from "../../../common/utils/testingUtils.tsx";
import RootStore from "../../../store/RootStore.ts";

import UserActions from "./UserActions.tsx";

import type { UserProfile } from "../../../common/types/userTypes.ts";

const mockedUseNavigate = vi.fn();
const mockedLogout = vi.fn((_variables, options) => {
  options?.onSuccess?.();
});

vi.mock("../../../api/auth/useLogout.ts");
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockedUseNavigate,
  };
});

describe("UserActions", () => {
  const mockedUserProfile: UserProfile = {
    id: "1",
    name: "user",
    email: "user@user.com",
    age: 22,
  };

  let rootStore: RootStore;

  beforeEach(() => {
    rootStore = new RootStore();
    rootStore.userStore.setUserProfile(mockedUserProfile);

    vi.mocked(useLogout).mockReturnValue({ mutate: mockedLogout } as any);
  });

  it("logout button logs out correctly", async () => {
    const user = userEvent.setup();

    renderWithProviders(<UserActions />, { rootStore, queryClient: true });

    const logoutButton = screen.getByTestId("LogoutIcon");
    await user.click(logoutButton);

    expect(mockedLogout).toHaveBeenCalled();
    expect(rootStore.userStore.userProfile).toBeNull();
    expect(mockedUseNavigate).toHaveBeenCalledWith("/auth/?mode=login");
  });

  it("renders correctly", () => {
    renderWithProviders(<UserActions />, { rootStore, queryClient: true });

    expect(screen.getByText("user")).toBeInTheDocument();
    expect(screen.getByTestId("LogoutIcon")).toBeInTheDocument();
  });
});
