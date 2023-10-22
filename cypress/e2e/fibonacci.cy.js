import { mainButton, circleClass } from "../../src/constants/constants";

describe("fibonacci test", function () {
  before(function () {
    cy.visit("fibonacci");
  });

  it("button state test", function () {
    cy.get("input").should("have.value", "0");
    cy.get(mainButton).should("have.attr", "disabled");
  });

  it("numbers generation works correctly", function () {
    cy.get("input").type("4");
    cy.get(mainButton).click();
    cy.get(circleClass).as("circle");
    cy.wait(3500);
    cy.get("@circle").each((el, index) => {
      if (index === 0) expect(el).to.contain("1");
      if (index === 1) expect(el).to.contain("1");
      if (index === 2) expect(el).to.contain("2");
      if (index === 2) expect(el).to.contain("3");
    });
  });
});
