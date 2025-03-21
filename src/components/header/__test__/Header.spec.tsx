import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Header } from "@/components/header";
import {
  CONTACT_ME_LINK,
  EMAIL_LINK,
  GITHUB_LINK,
  LINKEDIN_LINK,
  PROJECTS_LINK,
} from "@/constants";

describe("Header", () => {
  beforeEach(() => {
    render(<Header />);
  });
  it("Should renders navigation links", () => {
    const socialNavLinks = screen.getByTestId("social-nav-links");
    const appNavLinks = screen.getByTestId("app-nav-links");

    expect(socialNavLinks).toBeInTheDocument();
    expect(appNavLinks).toBeInTheDocument();
  });

  it("Should render all links with correct href attributes", () => {
    const navLinks = screen.getAllByRole("link");

    navLinks.forEach((navLink) => {
      expect(
        [
          EMAIL_LINK,
          GITHUB_LINK,
          LINKEDIN_LINK,
          PROJECTS_LINK,
          CONTACT_ME_LINK,
        ].includes(navLink.getAttribute("href")!),
      ).toBeTruthy();
    });
  });

  it("Should fire click events", () => {
    const navLinks = screen.getAllByRole("link");

    const onClickMock = jest.fn();

    navLinks.forEach((navLink) => {
      navLink.addEventListener("click", onClickMock);
      fireEvent.click(navLink);
    });

    expect(onClickMock).toHaveBeenCalledTimes(navLinks.length);
  });
});
