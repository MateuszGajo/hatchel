beforeEach(() => {
  cy.visit("/");
});

describe("homepage", () => {
  it("Should change tab element", () => {
    cy.get("[role=tab]").contains("Form").click();
    cy.get(".Mui-selected").contains("Form").should("be.visible");
  });

  it("Should form be invalid", () => {
    cy.get("[role=tab]").contains("Form").click();

    cy.get("input[name=name]").type("test");
    cy.get("input[name=name]").clear();
    cy.get("input[name=email]").type("invalid");
    cy.get("textarea[name=logMessage]").type("invalid");

    cy.get("p").contains("Name field is required");
    cy.get("p").contains("Email is invlid");
    cy.get("p").contains("Choose one of the following pattern:");

    cy.get("button").contains("Add").should("have.attr", "disabled");
  });

  it("Should form send request", () => {
    cy.get("[role=tab]").contains("Form").click();

    const formData = {
      name: "name",
      email: "validEmail@valid.com",
      log: "W 10 test",
    };

    cy.get("input[name=name]").type(formData.name);
    cy.get("input[name=email]").type(formData.email);
    cy.get("textarea[name=logMessage]").type(formData.log);

    cy.get("button").contains("Add").should("not.have.attr", "disabled");

    cy.get("button").contains("Add").click();

    cy.get("p")
      .contains("Log has been added successfully")
      .should("be.visible");
  });
});
