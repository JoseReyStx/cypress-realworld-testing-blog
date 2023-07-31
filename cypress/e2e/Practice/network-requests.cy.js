/*
  It is very helpful to use console.log() to log out the response data
  in order to see the data you are working with.
  
  You can also click on the request in the Cypress Command Log for an even
  better experience.
*/
describe("Network Requests", () => {
  beforeEach(() => {
    cy.intercept("GET", "/api/posts", (request) => {
      // this is to disable browser caching
      // https://glebbahmutov.com/blog/cypress-intercept-problems/
      delete request.headers["if-none-match"];
    }).as("posts");

    cy.visit("/");
  });

  it("/api/posts returns a status code of 200", () => {
    // Write an assertion that the route '/api/posts'
    // returns a status code of 200
    // Hint: You will need to use cy.request()
    // https://docs.cypress.io/api/commands/request
    cy.request('GET', '/api/posts').then((response) => {
      cy.wrap(response).its('status').should('eq', 200);
    });
  });

  it("/api/posts returns the correct number of posts", () => {
    // Write an assertion that the route '/api/posts'
    // returns the correct number of posts.
    cy.getAllPosts().then((response) => {
      cy.wrap(response.body).its('length').should('eq', 2);
    });
  });

  it("the posts.json fixture returns the correct number of posts", () => {
    // Write an assertion that the route '/api/posts'
    // returns the correct number of posts.
    // There are 25 total posts in the fixture
    // Hint: You will need to use cy.fixture()
    // https://docs.cypress.io/api/commands/fixture
    // cy.fixture('posts.json').then((posts) => {
    //   expect(posts).to.have.length(25);
    // });
    cy.fixture('posts.json').should('have.length', 25);
  });

  it("intercepts /api/posts and returns the correct number of posts", () => {
    // Wait upon the @posts intercept that happens in the beforeEach()
    // and assert that the response contains the correct number of posts
    // Hint: you will need to cy.wait() to wait upon the @posts alias.
    // https://docs.cypress.io/api/commands/wait
    // cy.wait('@posts').its('response.body').should('have.length', 2);
    cy.wait('@posts').its('response').should((response) => {
      const { body, statusCode } = response;
      expect(body).to.have.length(2);
      expect(statusCode).to.eq(200);
    });
  });
});
