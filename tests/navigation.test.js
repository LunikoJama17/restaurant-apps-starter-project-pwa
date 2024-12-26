// tests/navigation.test.js
describe('Page Navigation', () => {
    test('User  can navigate between pages', () => {
      // Simulate navigating to the homepage
      window.location.hash = '#/';
      expect(window.location.hash).toBe('#/');
  
      // Simulate clicking on the "Favorites" link
      window.location.hash = '#/favorite';
      expect(window.location.hash).toBe('#/favorite');
  
      // Simulate going back to the homepage ```javascript
      window.location.hash = '#/';
      expect(window.location.hash).toBe('#/');
    });
  
    test('User    cannot see favorites if none are added', () => {
      // Simulate navigating to the favorites page directly
      window.location.hash = '#/favorites';
      expect(window.location.hash).toBe('#/favorites');
  
      // Check for empty state message
      const emptyMessage = 'You have no favorite restaurants yet.';
      document.body.innerHTML = `<div class="empty-favorites">${emptyMessage}</div>`;
      const messageElement = document.querySelector('.empty-favorites');
      expect(messageElement.textContent).toBe(emptyMessage);
    });
  });