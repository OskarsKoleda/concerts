import { AxiosError, HttpStatusCode } from "axios";

import apiClient from "../apiClient";

import { unvisitEvent } from "./useUnvisitEvent";

vi.mock("../apiClient");

describe("unvisitEvent", () => {
  it("should return true when request is successful", async () => {
    vi.mocked(apiClient.delete).mockResolvedValueOnce({ status: HttpStatusCode.NoContent });
    const result = await unvisitEvent("slug");
    expect(result).toBe(true);
  });

  it("should return false when request is not successful", async () => {
    vi.mocked(apiClient.delete).mockResolvedValueOnce({ status: HttpStatusCode.Created });
    const result = await unvisitEvent("slug");
    expect(result).toBe(false);
  });

  it("should throw error when request fails", async () => {
    vi.mocked(apiClient.delete).mockRejectedValue(new AxiosError("error"));

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    await expect(unvisitEvent("slug")).rejects.toThrowError("error");

    consoleSpy.mockRestore();
  });
});
