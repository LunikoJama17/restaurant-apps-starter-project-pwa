import DicodingRestaurantApi from "../../data/dicoding-restaurant-api";
import UrlParser from "../../routes/url-parser";
import FavButtonInitiator from "../../utils/fav-initiator-btn";
import { createRestaurantDetailTemplate } from "../templates/template-creator";

const Detail = {
  async render() {
    return `
        <div id="restaurant" class="restaurant content" tabindex="-1"></div>
        <h3 class="review-title">Review</h3>
        <div class="customerReviews"></div>
        <div class="add-review">
          <h3 class="add-review-title">Add Review</h3>
          <form id="reviewForm">
            <input type="text" id="reviewName" placeholder="Your Name" required>
            <textarea id="reviewText" placeholder="Your Review" required></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    let restaurant;

    try {
      restaurant = await DicodingRestaurantApi.detailRestaurant(url.id);
    } catch (error) {
      console.error('Failed to fetch restaurant details:', error);
      restaurant = null;
    }

    const restaurantContainer = document.querySelector("#restaurant");
    const reviewSection = document.querySelector(".review-title");
    const addReviewSection = document.querySelector(".add-review");

    if (restaurant) {
      restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

      FavButtonInitiator.init({
        favButtonContainer: document.querySelector("#favButtonContainer"),
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
          description: restaurant.description,
          pictureId: restaurant.pictureId,
          rating: restaurant.rating,
          city: restaurant.city,
        },
      });

      const reviewForm = document.getElementById("reviewForm");

      const updateCustomerReviews = (reviews) => {
        const customerReviewsContainer = document.querySelector(".customerReviews");
        if (!customerReviewsContainer) {
          console.error("Element .customerReviews not found");
          return;
        }
        customerReviewsContainer.innerHTML = `
          ${reviews
            .map(
              (review) => `
            <div class="customer-review__card">
              <h4>${review.name}</h4>
              <small>${review.date}</small>
              <p>${review.review}</p>
            </div>
          `
            )
            .join("")}
        `;
      };

      updateCustomerReviews(restaurant.customerReviews);

      reviewForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const reviewName = document.getElementById("reviewName").value;
        const reviewText = document.getElementById("reviewText").value;

        const response = await fetch("https://restaurant-api.dicoding.dev/review", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: restaurant.id, name: reviewName, review: reviewText }),
        });

        if (response.ok) {
          const newReview = {
            name: reviewName,
            review: reviewText,
            date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
          };
          restaurant.customerReviews.push(newReview);
          updateCustomerReviews(restaurant.customerReviews);
          reviewForm.reset();
        } else {
          alert("Failed to add review. Please try again.");
        }
      });
    } else {
      restaurantContainer.innerHTML = `
        <div class="error-message">
          <h3>Data Restoran Tidak Dapat Dimuat</h3>
          <p>Anda sedang offline atau data restoran tidak tersedia. Silakan coba lagi nanti.</p>
        </div>
      `;
      reviewSection.style.display = "none";
      addReviewSection.style.display = "none";
    }
  },
};

export default Detail;
