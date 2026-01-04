import { AxiosError } from "axios";

import apiClient from "../apiClient";

import { visitEvent } from "./useVisitEvent";

vi.mock("../apiClient");

describe("visitEvent", () => {
  it("should return true when request status is NO CONTENT", async () => {
    vi.mocked(apiClient.post).mockResolvedValue({
      status: 204,
    });

    const result = await visitEvent("slug");

    expect(apiClient.post).toHaveBeenCalledWith("/events/slug/visit");
    expect(result).toBe(true);
  });

  it("should return false when request status is not NO CONTENT", async () => {
    vi.mocked(apiClient.post).mockResolvedValue({
      status: 201,
    });

    const result = await visitEvent("slug");
    expect(result).toBe(false);
  });

  it("should throw error when request fails", async () => {
    vi.mocked(apiClient.post).mockRejectedValue(new AxiosError("error"));

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    await expect(visitEvent("slug")).rejects.toThrowError("error");
    expect(console.error).toHaveBeenCalledWith("Network error");

    consoleSpy.mockRestore();
  });
});
