Feature('View Restaurant Detail');

Scenario('User  can see restaurant details', async ({ I }) => {
  // Visit the homepage
  I.amOnPage('/');

  // Wait for the restaurants to load
  I.waitForElement('.restaurant-item', 10);

  // Get the first restaurant element
  const firstRestaurant = locate('.restaurant-item').first();
  
  // Click on the first restaurant to view details
  I.click(firstRestaurant);

  // Ensure the restaurant details are displayed
  I.waitForElement('#restaurant', 10);
  I.seeElement('#restaurant');
});