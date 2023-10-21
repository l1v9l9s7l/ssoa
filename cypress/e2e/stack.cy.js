const initial = "4px solid rgb(0, 50, 255)";
const changing = "4px solid rgb(210, 82, 225)";
const modified = "4px solid rgb(127, 224, 81)";
const circle = "[data-testid^=circle]";

describe("stack page test", () => {
  const addButton = '[data-testid="button-add"]';
  const removeButton = '[data-testid="button-del"]';

  before(() => {
    cy.visit("http://localhost:3000/stack");
  });

  it("button state test", () => {
    cy.get("input").should("have.value", "");
    cy.get(addButton).should("be.disabled");
  });

  it("add to stack test", () => {
    cy.get("input").type("1");
    cy.get(addButton).click();
    cy.get(circle).eq(1).should("have.css", "border", changing).should("contain", "1");
    cy.wait(500);
    cy.get(circle).eq(1).should("have.css", "border", initial).should("contain", "1");
    cy.get(circle).should("have.length", 5);

    cy.get("input").type("2");
    cy.get(addButton).click();
    cy.get(circle).eq(1).should("have.css", "border", initial).should("contain", "1");
    cy.get(circle).eq(6).should("have.css", "border", changing).should("contain", "2");
    cy.wait(500);
    cy.get(circle).eq(6).should("have.css", "border", initial).should("contain", "2");
    cy.get(circle).should("have.length", 10);
  });

  it("remove to stack test", () => {
    cy.get(removeButton).click();
    cy.get(circle).eq(1).should("have.css", "border", changing).should("contain", "1");
    cy.wait(500);
    cy.get(circle).should("have.length", 5);
    cy.get(removeButton).click();
    cy.get(circle).should("have.length", 0);
  });

  it("removing button is disabled test", () => {
    cy.get(removeButton).should("be.disabled");
  });
});
