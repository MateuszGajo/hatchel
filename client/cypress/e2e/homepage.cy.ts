beforeEach(() => {
  cy.visit("/");
});

describe("homepage", () => {
  it("Should see relevent and form tabs", () => {
    cy.get("[role=tab]").contains("Relevent logs").should("be.visible");
    cy.get("[role=tab]").contains("Form").should("be.visible");
    cy.get(".Mui-selected").contains("Relevent logs").should("be.visible");
  });

  it("Should get logs pass", () => {
    cy.request(
      "GET",
      `http://localhost:5000/api/logs?type=E&severity[gte]=50`
    ).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("Should list have value", () => {
    cy.intercept(
      "GET",
      "http://localhost:5000/api/logs?type=E&severity[gte]=50",
      { fixture: "logs.json" }
    );
    cy.get("p").contains("W 10 message");
  });
});
