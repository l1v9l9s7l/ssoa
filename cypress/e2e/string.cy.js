import { circleClass, mainButton } from "../../src/constants/constants";

describe("string e2e", function () {
  before(function () {
    cy.visit("recursion");
  });

  it("button state test", function () {
    cy.get("input").should("have.value", "");
    cy.get(mainButton).should("have.attr", "disabled");
  });
  it("string turn test", function () {
    cy.get("input").type("fly");
    cy.get(mainButton).click();

    cy.get(circleClass).as("circle");

    cy.get("@circle").each((el, index) => {
      if (index === 0 || index === 2) {
        cy.wrap(el).should("have.css", "border", "4px solid rgb(210, 82, 225)");
      }
      if (index === 0) expect(el).to.contain("f");
      if (index === 1) expect(el).to.contain("l");
      if (index === 2) expect(el).to.contain("y");
    });

    cy.wait(2000);

    cy.get("@circle").each((el) => {
      cy.wrap(el).should("have.css", "border", "4px solid rgb(127, 224, 81)");
      cy.get("@circle").eq(0).contains("p", "f");
      cy.get("@circle").eq(1).contains("p", "l");
      cy.get("@circle").eq(2).contains("p", "y");
    });
  });
});
