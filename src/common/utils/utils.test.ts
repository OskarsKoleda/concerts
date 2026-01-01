import { formatEventDate } from "./utils";

describe("formatEventDate", () => {
  it("formats event date correctly when both dates are provided", () => {
    const result = formatEventDate("2024-12-30T00:00:00Z", "2025-01-02T00:00:00Z");

    expect(result).toBe("30.12.2024 - 02.01.2025");
  });

  it("formats event date correctly when only event date is provided", () => {
    const result = formatEventDate("2024-12-30T19:00:00Z");
    expect(result).toBe("30.12.2024");
  });
});
