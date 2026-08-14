import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ThemeToggle from "@/components/ui/ThemeToggle";

// Mock next-themes
vi.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: vi.fn(),
  }),
}));

describe("ThemeToggle", () => {
  it("renders without crashing", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("has accessible label", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-label");
  });
});
