/*
  All of these tests are failing and it is your job to debug them
  to find out why.
*/
describe("Debug Failing Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays the correct header text", () => {
    // cy.get('[data-test="home-header"]').contains("real world testing blog"); // Original
    cy.get('[data-test="home-header"]').contains(/real world testing blog/i); // After debugging
  });

  it("the post links on the homepage link to the correct posts", () => {
    cy.get('[data-test="post-link-0"]').click();
    // cy.location("pathname").should("eq", "/posts/pre-rendering"); // Original
    cy.location("pathname", { timeout: 6000 }).should("eq", "/posts/ssg-ssr"); // After debugging
  });

  it("displays all of the posts on the homepage", () => {
    cy.get('[data-test="posts-list"]').within(($post) => {
      // cy.get("a").should("have.length", 1); // Original
      cy.get("a").should("have.length", 2); // After debugging
    });
  });

  // it("/api/posts returns a status code of 201", () => { // Original
  it("/api/posts returns a status code of 200", () => { // After debugging
    cy.request("GET", "/api/posts").then((response) => {
      // expect(response.status).to.eq(201); // Original
      expect(response.status).to.eq(200); // After debugging
    });
  });
});
