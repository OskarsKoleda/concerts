import { renderHook, waitFor } from "@testing-library/react";

import apiClient from "../apiClient";
import { queryClientWrapper } from "../../common/utils/testingUtils";

import { login, useLogin } from "./useLogin";

vi.mock("../apiClient");

const mockUserData = {
  id: "123",
  name: "John Doe",
  email: "john@example.com",
  age: 30,
};

describe("useLogin", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("successfully authenticates and returns user data", async () => {
    vi.mocked(apiClient.post).mockResolvedValueOnce({ data: mockUserData });

    const { result } = renderHook(() => useLogin(), {
      wrapper: queryClientWrapper(),
    });

    result.current.mutate({
      email: "john@example.com",
      password: "password",
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(apiClient.post).toHaveBeenCalledWith("/auth/login", {
      email: "john@example.com",
      password: "password",
    });

    expect(result.current.data).toEqual(mockUserData);
  });

  it("calls the onSuccess callback when authentication succeeds", async () => {
    vi.mocked(apiClient.post).mockResolvedValueOnce({ data: mockUserData });

    const onSuccessMock = vi.fn();
    const { result } = renderHook(() => useLogin({ onSuccess: onSuccessMock }), {
      wrapper: queryClientWrapper(),
    });

    result.current.mutate({
      email: "john@example.com",
      password: "password",
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(onSuccessMock).toHaveBeenCalledWith(mockUserData, expect.anything(), undefined);
  });

  it("calls the onError callback when authentication fails", async () => {
    vi.mocked(apiClient.post).mockRejectedValueOnce(new Error("Something went wrong"));

    const onErrorMock = vi.fn();
    const { result } = renderHook(() => useLogin({ onError: onErrorMock }), {
      wrapper: queryClientWrapper(),
    });

    result.current.mutate({
      email: "john@example.com",
      password: "password",
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(onErrorMock).toHaveBeenCalledWith(expect.anything(), expect.anything(), undefined);
  });
});

describe("login", () => {
  it("performs a POST request to /auth/login and returns user data", async () => {
    vi.mocked(apiClient.post).mockResolvedValueOnce({ data: mockUserData });

    const result = await login({
      email: "john@example.com",
      password: "password",
    });

    expect(result).toEqual(mockUserData);
  });

  it("throws an error when the API request fails", async () => {
    vi.mocked(apiClient.post).mockRejectedValueOnce(new Error("Something went wrong"));

    await expect(
      login({
        email: "john@example.com",
        password: "password",
      }),
    ).rejects.toThrow("Something went wrong");
  });
});
