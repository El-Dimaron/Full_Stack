import { describe, expect, it } from "vitest";
import { getPaginationPages } from "./pagination";

describe("getPaginationPages", () => {
  it("should return all pages when totalPages is small", () => {
    expect(getPaginationPages(1, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it("should show first pages correctly", () => {
    expect(getPaginationPages(1, 32)).toEqual([1, 2, "...", 32]);
  });

  it("should show pages around current page", () => {
    expect(getPaginationPages(5, 32)).toEqual([1, "...", 4, 5, 6, "...", 32]);
  });

  it("should show last pages correctly", () => {
    expect(getPaginationPages(32, 32)).toEqual([1, "...", 31, 32]);
  });
});
