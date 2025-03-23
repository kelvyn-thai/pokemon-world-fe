import { envConfigs } from "cypress/configs/env.config";

describe("Greeting", () => {
  it("Should render Greeting correctly", () => {
    cy.visit(envConfigs.NEXT_PUBLIC_DOMAIN_URL);

    cy.get("[data-testid=greeting-section]").should("exist");
    cy.get("[data-testid=name]").as("name");
    cy.get("[data-testid=avatar]").should("exist");
    cy.get("[data-testid=bio]").as("bio");

    cy.get("@name").should("exist");
    cy.get("@name").should("contain.text", `Hello, I am Kelvyn Thai`);

    cy.get("@bio").should("exist");
    cy.get("@bio").should(
      "contain.text",
      "A frontend engineer specialised in React",
    );

    cy.get("@name").contains("Hello, I am");
  });
});
