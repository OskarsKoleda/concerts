import { renderHook, waitFor } from "@testing-library/react";
import apiClient from "../apiClient";
import { login, useLogin } from "./useLogin";
import { queryClientWrapper } from "../../common/utils/testingUtils";

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

  it("should login user", async () => {
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

  it("should call onSuccess callback", async () => {
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

  it("should call onError callback", async () => {
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
  it("should login user", async () => {
    vi.mocked(apiClient.post).mockResolvedValueOnce({ data: mockUserData });

    const result = await login({
      email: "john@example.com",
      password: "password",
    });

    expect(result).toEqual(mockUserData);
  });

  it("should throw error", async () => {
    vi.mocked(apiClient.post).mockRejectedValueOnce(new Error("Something went wrong"));

    await expect(
      login({
        email: "john@example.com",
        password: "password",
      }),
    ).rejects.toThrow("Something went wrong");
  });
});
