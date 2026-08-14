import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { I18nProvider, useI18n } from "@/lib/i18n";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Test component that uses useI18n
function TestComponent() {
  const { locale, setLocale, t } = useI18n();
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <span data-testid="translation">{t("nav.home")}</span>
      <button onClick={() => setLocale("vi")}>Switch to VI</button>
    </div>
  );
}

describe("i18n", () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it("provides default locale as 'en'", () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );
    expect(screen.getByTestId("locale")).toHaveTextContent("en");
  });

  it("provides translations for English", () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );
    expect(screen.getByTestId("translation")).toHaveTextContent("Home");
  });

  it("switches locale when setLocale is called", () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );

    fireEvent.click(screen.getByText("Switch to VI"));
    expect(screen.getByTestId("locale")).toHaveTextContent("vi");
  });

  it("saves locale to localStorage", () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );

    fireEvent.click(screen.getByText("Switch to VI"));
    expect(localStorageMock.getItem("locale")).toBe("vi");
  });

  it("loads locale from localStorage", () => {
    localStorageMock.setItem("locale", "vi");

    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );

    expect(screen.getByTestId("locale")).toHaveTextContent("vi");
  });
});
