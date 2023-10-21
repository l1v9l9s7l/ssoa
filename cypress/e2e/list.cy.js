const initial = "4px solid rgb(0, 50, 255)";
const changing = "4px solid rgb(210, 82, 225)";
const modified = "4px solid rgb(127, 224, 81)";
const circle = "[data-testid^=circle]";

describe("testing linked-list page", () => {
  const addToHeadButton = '[data-testid="button-add-to-head"]';
  const addToTailButton = '[data-testid="button-add-to-tail"]';
  const addByIndexButton = '[data-testid="button-add-by-index"]';
  const delByIndexButton = '[data-testid="button-del-by-index"]';
  const deleteFromTailButton = '[data-testid="button-del-from-tail"]';
  const deleteFromHeadButton = '[data-testid="button-del-from-head"]';
  const valueInput = 'input[name="value"]';
  const indexInput = 'input[name="index"]';

  before(() => {
    cy.visit("http://localhost:3000/list");
  });

  it("button state test", () => {
    cy.get("input").should("have.value", "");
    cy.get(addToHeadButton).should("be.disabled");
    cy.get(addToTailButton).should("be.disabled");
    cy.get(addByIndexButton).should("be.disabled");
  });

  it("add to tail", () => {
    cy.get(valueInput).type("tail");
    cy.get(addToTailButton).click();
    cy.get(circle).eq(16).should("have.css", "border", changing).should("contain", "tail");

    cy.wait(500);
    cy.get(circle).eq(21).should("have.css", "border", initial);

    cy.wait(500);
    cy.get(circle).eq(21).should("have.css", "border", modified).should("contain", "tail");

    cy.wait(500);
    cy.get(circle).eq(21).should("have.css", "border", initial);
  });

  it("add to head", () => {
    cy.get(valueInput).type("head");
    cy.get(addToHeadButton).click();
    cy.get(circle).first().next().should("have.css", "border", changing).should("contain", "head");

    cy.wait(1000);
    cy.get(circle).first().next().should("have.css", "border", modified).should("contain", "head");

    cy.wait(500);
    cy.get(circle).first().next().should("have.css", "border", initial);
  });

  it("remove from tail", () => {
    cy.get(deleteFromTailButton).click();
    cy.get(circle).eq(31).should("have.css", "border", changing).should("have.text", "tail");
    cy.get(circle).eq(26).should("have.text", "");

    cy.wait(500);
    cy.get(circle).eq(21).should("have.css", "border", initial).should("have.text", "1");
  });

  it("remove from head", () => {
    cy.get(deleteFromHeadButton).click();
    cy.get(circle).eq(6).should("have.css", "border", changing);
    cy.get(circle).eq(1).prev().should("have.text", "head");
    cy.get(circle).eq(1).should("have.text", "");

    cy.wait(500);
    cy.get(circle).eq(1).should("have.css", "border", initial);
    cy.get(circle).eq(1).next().should("have.text", "0");
  });

  it("add by index", () => {
    cy.get(valueInput).type("new");
    cy.get(indexInput).type("2");
    cy.get(addByIndexButton).click();

    cy.wait(1000);
    cy.get(circle).eq(1).should("have.css", "border", changing).should("have.text", "new");

    cy.wait(500);
    cy.get(circle).eq(1).should("have.css", "border", changing);

    cy.wait(1000);
    cy.get(circle).eq(11).should("have.css", "border", changing);

    cy.wait(500);
    cy.get(circle).eq(6).should("have.css", "border", changing);

    cy.wait(500);
    cy.get(circle).eq(1).should("have.css", "border", initial);
    cy.get(circle).eq(6).should("have.css", "border", initial);
    cy.get(circle).eq(11).should("have.css", "border", modified).should("have.text", "new");

    cy.wait(500);
    cy.get(circle).eq(11).should("have.css", "border", initial).should("have.text", "new");
  });

  it("remove by index", () => {
    cy.get(indexInput).type("2");
    cy.get(delByIndexButton).click();
    cy.get(circle).eq(1).should("have.css", "border", changing);

    cy.wait(500);
    cy.get(circle).eq(6).should("have.css", "border", changing);

    cy.wait(500);
    cy.get(circle).eq(11).should("have.css", "border", initial).should("have.text", "");
    cy.get(circle).eq(16).should("have.css", "border", changing).should("have.text", "new");

    cy.wait(500);
    cy.get(circle).eq(11).should("have.css", "border", initial).should("have.text", "8");
  });
});
