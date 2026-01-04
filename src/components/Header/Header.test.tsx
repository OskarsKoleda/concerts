import { screen } from "@testing-library/react";

import { renderWithProviders } from "../../common/utils/testingUtils";

import Header from "./Header";

describe("Header", () => {
  it("renders correctly when authenticated", () => {
    renderWithProviders(<Header isAuthenticated={true} />);
    expect(screen.getByTestId("MenuIcon")).toBeInTheDocument();

    const index = screen.getByRole("link", { name: "Event Tracker" });
    expect(index).toHaveAttribute("href", "/");
    expect(index).toHaveTextContent("Event Tracker");

    const viewEventsButton = screen.getByRole("button", { name: "View Events" });
    expect(viewEventsButton.parentElement).toHaveAttribute("href", "/events");

    const createEventButton = screen.getByRole("button", { name: "Add Event" });
    expect(createEventButton.parentElement).toHaveAttribute("href", "/events/new");

    const profileButton = screen.getByRole("button", { name: "Profile" });
    expect(profileButton.parentElement).toHaveAttribute("href", "/");

    const logoutButton = screen.getByRole("button", { name: "Logout" });
    expect(logoutButton).toBeInTheDocument();
  });

  it("renders correctly when not authenticated", () => {
    renderWithProviders(<Header isAuthenticated={false} />);
    expect(screen.queryByTestId("MenuIcon")).toBeNull();

    const index = screen.getByRole("link", { name: "Event Tracker" });
    expect(index).toBeInTheDocument();
    expect(index).toHaveAttribute("href", "/");
    expect(index).toHaveTextContent("Event Tracker");

    const viewEventsButton = screen.getByRole("button", { name: "View Events" });
    expect(viewEventsButton.parentElement).toHaveAttribute("href", "/events");

    const createEventButton = screen.queryByRole("button", { name: "Add Event" });
    expect(createEventButton).toBeNull();

    const profileButton = screen.queryByRole("button", { name: "Profile" });
    expect(profileButton).toBeNull();

    const logoutButton = screen.queryByRole("button", { name: "Logout" });
    expect(logoutButton).toBeNull();

    const createProfileButton = screen.getByRole("link", { name: "Create Profile" });
    expect(createProfileButton).toHaveAttribute("href", "/auth");
  });
});
