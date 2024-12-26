Feature('Favorite Restaurant');

Scenario('User  can like and unlike a restaurant', async ({ I }) => {
  // Mengunjungi halaman utama
  I.amOnPage('/');

  // Menunggu restoran untuk dimuat
  I.waitForElement('.restaurant-item', 10);

  // Mengambil elemen restoran pertama
  const firstRestaurant = locate('.restaurant-item').first();
  
  // Mengklik restoran pertama untuk melihat detail
  I.click(firstRestaurant);

  // Menunggu tombol favorit untuk dimuat
  I.waitForElement('#favButton', 10);

  // Menyukai restoran
  I.click('#favButton');
  
  // Memastikan bahwa tombol berubah menjadi "Hapus dari Favorit"
  I.seeElement('#favButton');
  I.see('Hapus dari Favorit', '#favButton');

  // Kembali ke halaman favorit
  I.amOnPage('/#/favorite');

  // Memastikan restoran yang disukai muncul di daftar favorit
  I.waitForElement('.restaurant-item', 10);
  I.seeElement(firstRestaurant);

  // Mengklik restoran yang disukai untuk melihat detail
  I.click(firstRestaurant);

  // Menunggu tombol untuk dimuat
  I.waitForElement('#favButton', 10);

  // Membatalkan suka restoran
  I.click('#favButton');

  // Memastikan bahwa tombol berubah kembali menjadi "Tambahkan ke Favorit"
  I.seeElement('#favButton');
  I.see('Tambahkan ke Favorit', '#favButton');

  // Kembali ke halaman favorit
  I.amOnPage('/#/favorite');

  // Memastikan restoran yang disukai tidak ada di daftar favorit
  I.dontSeeElement(firstRestaurant);
});