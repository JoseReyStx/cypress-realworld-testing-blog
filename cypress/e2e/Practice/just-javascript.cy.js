const { _ } = Cypress;
import { getFormatedDate, sortedPosts } from '../helpers/helper';

describe("Cypress is just JavaScript", () => {
  beforeEach("Visit main page", () => {
    cy.visit("/");
  });

  it("uses _.each() from lodash to make sure the titles from the posts api are displayed correctly on the home page", () => {
    // Use _.each() from lodash to iterate over the posts inside of response.body
    // while also getting the post titles on the homepage to make sure that the
    // titles displayed on the homepage match the titles in the response.body

    // Hint: Since the posts are sorted by date on the homepage, we have included
    // a sortedPosts function which will sort the posts inside of response.body for you.
    // https://lodash.com/docs/4.17.15#forEach

    cy.request("GET", "/api/posts").then((response) => {
      _.each(sortedPosts(response.body), (post, i) => {
        cy.get(`[data-test="post-link-${i}"]`).contains(post.title);
      });
    });
  });

  it("formats the post date correctly on the homepage", () => {
    // Use _.each() from lodash to iterate over the posts inside of response.body
    // while also getting the post dates on the homepage to make sure that the
    // dates displayed on the homepage are formatted correctly.
    // i.e 2020-01-02 from the API is formatted and displayed as January 2, 2020 on the homepage

    // Hint: We are included format and parseISO from the 'date-fns' library.
    // You will need to use both of these methods to format the dates coming
    // from the API into the correct format. If you get stuck, the formatting string,
    // can be found inside of /components/date.js

    cy.request("GET", "/api/posts").then((response) => {
      const { body } = response;

      _.each(sortedPosts(body), (post, i) => {
        const { date } = post;
        const newDate = getFormatedDate(date, "MMMM d, yyyy");
        cy.get(`[data-test="post-date-${i}"]`).contains(newDate);
      });
    });
  });
});
