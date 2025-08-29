import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect } from "vitest";

import { renderWithProviders } from "../../../common/utils/testingUtils.tsx";
import RootStore from "../../../store/RootStore.ts";

import UserActions from "./UserActions.tsx";

const mockedLogout = vi.fn();
const mockedNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

test.skip("logout button logs out correctly", async () => {
  const rootStore = new RootStore();
  const user = userEvent.setup();

  // rootStore.userStore.logoutUser = mockedLogout;

  renderWithProviders(<UserActions />, { rootStore });

  const logoutButton = screen.getByTestId("LogoutIcon");
  await user.click(logoutButton);

  expect(mockedLogout).toHaveBeenCalled();
  expect(mockedNavigate).toHaveBeenCalledWith("/auth/?mode=login");
});
