import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Skeleton, {
  CardSkeleton,
  ProjectCardSkeleton,
  BlogPostSkeleton,
  CredentialCardSkeleton,
  ExperienceCardSkeleton,
  HeroSkeleton,
} from "@/components/ui/Skeleton";

describe("Skeleton", () => {
  it("renders with default className", () => {
    const { container } = render(<Skeleton />);
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass("animate-pulse");
  });

  it("renders with custom className", () => {
    const { container } = render(<Skeleton className="h-10 w-20" />);
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveClass("h-10", "w-20");
  });

  it("renders with custom rounded prop", () => {
    const { container } = render(<Skeleton rounded="rounded-full" />);
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveClass("rounded-full");
  });
});

describe("CardSkeleton", () => {
  it("renders without crashing", () => {
    const { container } = render(<CardSkeleton />);
    expect(container.firstChild).toBeTruthy();
  });
});

describe("ProjectCardSkeleton", () => {
  it("renders without crashing", () => {
    const { container } = render(<ProjectCardSkeleton />);
    expect(container.firstChild).toBeTruthy();
  });
});

describe("BlogPostSkeleton", () => {
  it("renders without crashing", () => {
    const { container } = render(<BlogPostSkeleton />);
    expect(container.firstChild).toBeTruthy();
  });
});

describe("CredentialCardSkeleton", () => {
  it("renders without crashing", () => {
    const { container } = render(<CredentialCardSkeleton />);
    expect(container.firstChild).toBeTruthy();
  });
});

describe("ExperienceCardSkeleton", () => {
  it("renders without crashing", () => {
    const { container } = render(<ExperienceCardSkeleton />);
    expect(container.firstChild).toBeTruthy();
  });
});

describe("HeroSkeleton", () => {
  it("renders without crashing", () => {
    const { container } = render(<HeroSkeleton />);
    expect(container.firstChild).toBeTruthy();
  });
});
