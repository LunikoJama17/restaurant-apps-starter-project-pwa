import DicodingRestaurantApi from "../../data/dicoding-restaurant-api";
import { createRestaurantItemTemplate } from "../templates/template-creator";

const Home = {
  async render() {
    return `
        <div id="homeContent" class="content" tabindex="-1">
          <div id="hero" aria-labelledby="hero-desc">
            <picture>
              <img src="../images/heros/hero-image_4.jpg" alt="Scenic view of a restaurant" id="hero-img" loading="lazy">
            </picture>
            <div id="hero-layer">
              <p id="hero-desc" role="heading" aria-level="1">
                Discover the best restaurants
              </p>
            </div>
          </div>
          <h2 class="content__heading">Explore Restaurants</h2>
          <div id="restaurants" class="restaurants">
            <div class="skeleton-item"></div>
            <div class="skeleton-item"></div>
            <div class="skeleton-item"></div>
          </div>
      </div>
      `;
  },
  
  async afterRender() {
    const restaurants = await DicodingRestaurantApi.restaurantList();
    const restaurantsContainer = document.querySelector("#restaurants");
    restaurantsContainer.innerHTML = '';
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });

  const restaurantItems = document.querySelectorAll('.restaurant-item');
    restaurantItems.forEach((item) => {
      item.addEventListener('click', () => {
        const restaurantId = item.getAttribute('data-id');
        window.location.hash = `#/detail/${restaurantId}`;
      });
    });
  }
};

export default Home;
