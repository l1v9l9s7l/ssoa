describe("app works correctly with routes", function () {
  beforeEach(function () {
    cy.visit("");
  });

  it("open cart page on default", function () {
    cy.contains("Вдохновлено школами");
  });

  it("open string page after click", function () {
    cy.get('[data-testid="stringPage"]').click();
    cy.contains("Развернуть");
  });
  it("open fibonacci page by click", function () {
    cy.get('[data-testid="fibonacciPage"]').click();
    cy.contains("Развернуть");
  });
  it("open sorting page by click", function () {
    cy.get('[data-testid="sortingPage"]').click();
    cy.contains("Новый массив");
  });
  it("open stack page by click", function () {
    cy.get('[data-testid="stackPage"]').click();
    cy.contains("Добавить");
  });
  it("open queue page by click", function () {
    cy.get('[data-testid="queuePage"]').click();
    cy.contains("Добавить");
  });
  it("open list page by click", function () {
    cy.get('[data-testid="listPage"]').click();
    cy.contains("Добавить по индексу");
  });
});
