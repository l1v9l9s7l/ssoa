describe("fibonacci test", function () {
  before(function () {
    cy.visit("http://localhost:3000/fibonacci");
  });

  it("button state test", function () {
    cy.get("input").should("have.value", "0");
    cy.get('[data-testid="button-main"]').should("have.attr", "disabled");
  });

  it("numbers generation works correctly", function () {
    cy.get("input").type("4");
    cy.get('[data-testid="button-main"]').click();
    cy.get("[class^=circle_circle]").as("circle");
    cy.wait(3500);
    cy.get("@circle").each((el, index) => {
      if (index === 0) expect(el).to.contain("1");
      if (index === 1) expect(el).to.contain("1");
      if (index === 2) expect(el).to.contain("2");
      if (index === 2) expect(el).to.contain("3");
    });
  });
});
