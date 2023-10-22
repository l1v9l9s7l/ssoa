import {
  initial,
  changing,
  circleTI,
  addButton,
  removeButton,
  clearButton,
  circleClass,
} from "../../src/constants/constants";

describe("testing queue page", () => {
  before(() => {
    cy.visit("queue");
  });

  it("button state test", () => {
    cy.get("input").should("have.value", "");
    cy.get(addButton).should("be.disabled");
  });

  it("add to queue test", () => {
    cy.get("input").type("1");
    cy.get(addButton).click();

    cy.get(circleTI).eq(1).should("have.css", "border", changing);

    cy.wait(500);

    cy.get(circleTI).eq(1).should("have.css", "border", initial).should("contain", "1");
    cy.get(circleTI).eq(1).prev().contains("head");
    cy.get(circleTI).eq(1).next().next().contains("tail");

    cy.get("input").type("2");
    cy.get(addButton).click();

    cy.get(circleTI).eq(6).should("have.css", "border", changing);
    cy.wait(500);
    cy.get(circleTI).eq(6).should("have.css", "border", initial).should("contain", "2");
    cy.get(circleTI).eq(1).prev().contains("head");
    cy.get(circleTI).eq(6).next().next().contains("tail");

    cy.get("input").type("3");
    cy.get(addButton).click();

    cy.get(circleTI).eq(11).should("have.css", "border", changing);

    cy.wait(500);

    cy.get(circleTI).eq(11).should("have.css", "border", initial).should("contain", "3");
    cy.get(circleTI).eq(1).prev().contains("head");
    cy.get(circleTI).eq(11).next().next().contains("tail");
  });

  it("remove to queue test", () => {
    cy.get(removeButton).click();
    cy.get(circleTI).eq(1).should("contain", "");
    cy.get(circleTI).eq(5).contains("head");
  });

  it("removing button test", () => {
    cy.get(clearButton).click();
    cy.get("input").type("1");
    cy.get(addButton).click();
    cy.get(circleTI).eq(1).should("have.css", "border", changing);
    cy.wait(500);
    cy.get(clearButton).click();
    cy.get(circleClass).should("have.text", "");
    cy.get(addButton).should("be.disabled");
    cy.get(removeButton).should("be.disabled");
  });
});
