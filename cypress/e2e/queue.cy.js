const initial = "4px solid rgb(0, 50, 255)";
const changing = "4px solid rgb(210, 82, 225)";
const modified = "4px solid rgb(127, 224, 81)";
const circle = "[data-testid^=circle]";

describe("testing queue page", () => {
  const addButton = '[data-testid="button-add"]';
  const removeButton = '[data-testid="button-del"]';
  const clearButton = '[data-testid="button-clear"]';

  before(() => {
    cy.visit("http://localhost:3000/queue");
  });

  it("button state test", () => {
    cy.get("input").should("have.value", "");
    cy.get(addButton).should("be.disabled");
  });

  it("add to queue test", () => {
    cy.get("input").type("1");
    cy.get(addButton).click();

    cy.get(circle).eq(1).should("have.css", "border", changing);

    cy.wait(500);

    cy.get(circle).eq(1).should("have.css", "border", initial).should("contain", "1");
    cy.get(circle).eq(1).prev().contains("head");
    cy.get(circle).eq(1).next().next().contains("tail");

    cy.get("input").type("2");
    cy.get(addButton).click();

    cy.get(circle).eq(6).should("have.css", "border", changing);
    cy.wait(500);
    cy.get(circle).eq(6).should("have.css", "border", initial).should("contain", "2");
    cy.get(circle).eq(1).prev().contains("head");
    cy.get(circle).eq(6).next().next().contains("tail");

    cy.get("input").type("3");
    cy.get(addButton).click();

    cy.get(circle).eq(11).should("have.css", "border", changing);

    cy.wait(500);

    cy.get(circle).eq(11).should("have.css", "border", initial).should("contain", "3");
    cy.get(circle).eq(1).prev().contains("head");
    cy.get(circle).eq(11).next().next().contains("tail");
  });

  it("remove to queue test", () => {
    cy.get(removeButton).click();
    cy.get(circle).eq(1).should("contain", "");
    cy.get(circle).eq(5).contains("head");
  });

  it("removing button test", () => {
    cy.get(clearButton).click();
    cy.get("input").type("1");
    cy.get(addButton).click();
    cy.get(circle).eq(1).should("have.css", "border", changing);
    cy.wait(500);
    cy.get(clearButton).click();
    cy.get("[class*=circle_circle]").should("have.text", "");
    cy.get(addButton).should("be.disabled");
    cy.get(removeButton).should("be.disabled");
  });
});
