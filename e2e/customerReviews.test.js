Feature('Customer Review');

Scenario('User  can add a review for a restaurant', async ({ I }) => {
  // Mengunjungi halaman utama
  I.amOnPage('/');

  // Menunggu restoran untuk dimuat
  I.waitForElement('.restaurant-item', 10);

  // Mengambil elemen restoran pertama
  const firstRestaurant = locate('.restaurant-item').first();
  
  // Mengklik restoran pertama untuk melihat detail
  I.click(firstRestaurant);

  // Menunggu form ulasan untuk dimuat
  I.waitForElement('#reviewForm', 10);

  // Mengisi nama dan ulasan
  const reviewName = 'John Doe';
  const reviewText = 'This restaurant is amazing!';

  I.fillField('#reviewName', reviewName);
  I.fillField('#reviewText', reviewText);

  // Mengklik tombol submit
  I.click('Submit');

  // Memastikan ulasan baru muncul di daftar ulasan
  I.waitForElement('.customer-review__card', 10);
  I.see(reviewName, '.customer-review__card');
  I.see(reviewText, '.customer-review__card');
});