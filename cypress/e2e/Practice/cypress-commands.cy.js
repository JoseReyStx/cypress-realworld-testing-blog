/// <reference types="Cypress" />
describe("Custom Cypress Commands", () => {
  it("uses cy.getAllPosts()to retrieve all posts from the /api/posts endpoint", () => {
    // Create a custom Cypress Command called 'getAllPosts' which uses
    // cy.request() to get all of the posts from the /api/posts endpoint
    // Then use this custom command in this test to assert that the length of the posts
    // returned is equal to 2
    cy.getAllPosts().then((response) => {
      const { body, status } = response;
      // cy.wrap(response).as('posts').its('body').its('length').should("eq", 2);
      // cy.get('@posts').its('status').should('eq', 200);
      expect(body).to.have.lengthOf(2);
      expect(status).to.eq(200);
    });
  });

  it("uses cy.getFirstPost() to retrieve the first post from the /api/posts endpoint", () => {
    // Create a custom Cypress Command called 'getFirstPost' which uses
    // cy.request() to get the first post from the /api/posts endpoint
    // Then use this custom command in this test to assert that the id of the first post
    // is equal to 'pre-rendering'
    cy.getFirstPost().then((posts) => {
      // cy.wrap(posts.body[0].id).should('eq', 'pre-rendering');
      cy.wrap(posts).its('id').should('eq', 'pre-rendering');
    });
  });
});
