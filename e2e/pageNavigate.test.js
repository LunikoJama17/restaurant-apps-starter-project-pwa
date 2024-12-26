Feature('Page Navigation');

Scenario('User  can navigate between pages', async ({ I }) => {
  // Visit the homepage
  I.amOnPage('/');

  // Click on the "Favorites" link
  I.click('Favorite');

  // Go back to the homepage
  I.click('Home');

  // Ensure the homepage is displayed again
  I.waitForElement('.restaurant-item', 10);
  I.seeElement('.restaurant-item');
});