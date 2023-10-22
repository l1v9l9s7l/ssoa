import {
  initial,
  changing,
  circleTI,
  addButton,
  removeButton,
} from "../../src/constants/constants";

describe("stack page test", () => {
  before(() => {
    cy.visit("stack");
  });

  it("button state test", () => {
    cy.get("input").should("have.value", "");
    cy.get(addButton).should("be.disabled");
  });

  it("add to stack test", () => {
    cy.get("input").type("1");
    cy.get(addButton).click();
    cy.get(circleTI).eq(1).should("have.css", "border", changing).should("contain", "1");
    cy.wait(500);
    cy.get(circleTI).eq(1).should("have.css", "border", initial).should("contain", "1");
    cy.get(circleTI).should("have.length", 5);

    cy.get("input").type("2");
    cy.get(addButton).click();
    cy.get(circleTI).eq(1).should("have.css", "border", initial).should("contain", "1");
    cy.get(circleTI).eq(6).should("have.css", "border", changing).should("contain", "2");
    cy.wait(500);
    cy.get(circleTI).eq(6).should("have.css", "border", initial).should("contain", "2");
    cy.get(circleTI).should("have.length", 10);
  });

  it("remove to stack test", () => {
    cy.get(removeButton).click();
    cy.get(circleTI).eq(1).should("have.css", "border", changing).should("contain", "1");
    cy.wait(500);
    cy.get(circleTI).should("have.length", 5);
    cy.get(removeButton).click();
    cy.get(circleTI).should("have.length", 0);
  });

  it("removing button is disabled test", () => {
    cy.get(removeButton).should("be.disabled");
  });
});
