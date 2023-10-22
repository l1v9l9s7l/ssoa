import {
  initial,
  changing,
  modified,
  circleTI,
  addToHeadButton,
  addToTailButton,
  addByIndexButton,
  delByIndexButton,
  deleteFromTailButton,
  deleteFromHeadButton,
} from "../../src/constants/constants";

describe("testing linked-list page", () => {
  const valueInput = 'input[name="value"]';
  const indexInput = 'input[name="index"]';

  before(() => {
    cy.visit("list");
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
    cy.get(circleTI).eq(16).should("have.css", "border", changing).should("contain", "tail");

    cy.wait(500);
    cy.get(circleTI).eq(21).should("have.css", "border", initial);

    cy.wait(500);
    cy.get(circleTI).eq(21).should("have.css", "border", modified).should("contain", "tail");

    cy.wait(500);
    cy.get(circleTI).eq(21).should("have.css", "border", initial);
  });

  it("add to head", () => {
    cy.get(valueInput).type("head");
    cy.get(addToHeadButton).click();
    cy.get(circleTI)
      .first()
      .next()
      .should("have.css", "border", changing)
      .should("contain", "head");

    cy.wait(1000);
    cy.get(circleTI)
      .first()
      .next()
      .should("have.css", "border", modified)
      .should("contain", "head");

    cy.wait(500);
    cy.get(circleTI).first().next().should("have.css", "border", initial);
  });

  it("remove from tail", () => {
    cy.get(deleteFromTailButton).click();
    cy.get(circleTI).eq(31).should("have.css", "border", changing).should("have.text", "tail");
    cy.get(circleTI).eq(26).should("have.text", "");

    cy.wait(500);
    cy.get(circleTI).eq(21).should("have.css", "border", initial).should("have.text", "1");
  });

  it("remove from head", () => {
    cy.get(deleteFromHeadButton).click();
    cy.get(circleTI).eq(6).should("have.css", "border", changing);
    cy.get(circleTI).eq(1).prev().should("have.text", "head");
    cy.get(circleTI).eq(1).should("have.text", "");

    cy.wait(500);
    cy.get(circleTI).eq(1).should("have.css", "border", initial);
    cy.get(circleTI).eq(1).next().should("have.text", "0");
  });

  it("add by index", () => {
    cy.get(valueInput).type("new");
    cy.get(indexInput).type("2");
    cy.get(addByIndexButton).click();

    cy.wait(1000);
    cy.get(circleTI).eq(1).should("have.css", "border", changing).should("have.text", "new");

    cy.wait(500);
    cy.get(circleTI).eq(1).should("have.css", "border", changing);

    cy.wait(1000);
    cy.get(circleTI).eq(11).should("have.css", "border", changing);

    cy.wait(500);
    cy.get(circleTI).eq(6).should("have.css", "border", changing);

    cy.wait(500);
    cy.get(circleTI).eq(1).should("have.css", "border", initial);
    cy.get(circleTI).eq(6).should("have.css", "border", initial);
    cy.get(circleTI).eq(11).should("have.css", "border", modified).should("have.text", "new");

    cy.wait(500);
    cy.get(circleTI).eq(11).should("have.css", "border", initial).should("have.text", "new");
  });

  it("remove by index", () => {
    cy.get(indexInput).type("2");
    cy.get(delByIndexButton).click();
    cy.get(circleTI).eq(1).should("have.css", "border", changing);

    cy.wait(500);
    cy.get(circleTI).eq(6).should("have.css", "border", changing);

    cy.wait(500);
    cy.get(circleTI).eq(11).should("have.css", "border", initial).should("have.text", "");
    cy.get(circleTI).eq(16).should("have.css", "border", changing).should("have.text", "new");

    cy.wait(500);
    cy.get(circleTI).eq(11).should("have.css", "border", initial).should("have.text", "8");
  });
});
