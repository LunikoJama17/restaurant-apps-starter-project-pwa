import FavoriteRestaurantIdb from '../src/scripts/data/restaurant-fav-idb';

if (typeof structuredClone !== 'function') {
    global.structuredClone = (obj) => {
      return JSON.parse(JSON.stringify(obj));
    };
  }

describe('Integration Test for Favorite Button', () => {
  let restaurant;

  beforeEach(async () => {
    restaurant = { id: 1, name: 'Test Restaurant' };
    await FavoriteRestaurantIdb.putRestaurant(restaurant);
  });

  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(restaurant.id);
  });

  it('should add restaurant to favorites', async () => {
    const isExist = await FavoriteRestaurantIdb.getRestaurant(restaurant.id);
    expect(isExist).toEqual(restaurant);
  });

  it('should remove restaurant from favorites', async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(restaurant.id);
    const isExist = await FavoriteRestaurantIdb.getRestaurant(restaurant.id);
    expect(isExist).toBeUndefined();
  });
});