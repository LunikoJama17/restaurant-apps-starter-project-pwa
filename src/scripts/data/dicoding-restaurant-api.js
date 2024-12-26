import API_ENDPOINT from "../globals/api-endpoints";

class DicodingRestaurantApi {
  static async restaurantList() {
    const response = await fetch(API_ENDPOINT.RESTAURANT);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestaurant(id) {
    try {
      const response = await fetch(API_ENDPOINT.DETAIL(id));
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseJson = await response.json();
      return responseJson.restaurant;
    } catch (error) {
      console.error('Failed to fetch restaurant details:', error);
      throw error;
    }
  }
}

export default DicodingRestaurantApi;