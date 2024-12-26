import DicodingRestaurantApi from '../src/scripts/data/dicoding-restaurant-api';

jest.mock('../src/scripts/data/dicoding-restaurant-api');

describe('View Restaurant Detail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('User  can see restaurant details', async () => {
    const mockRestaurant = {
      id: 1,
      name: 'Test Restaurant',
      city: 'Test City',
      address: 'Test Address',
      rating: 4.5,
      description: 'Test Description',
      customerReviews: [],
    };

    DicodingRestaurantApi.detailRestaurant.mockResolvedValue(mockRestaurant);

    const restaurant = await DicodingRestaurantApi.detailRestaurant(1);
    expect(restaurant).toEqual(mockRestaurant);
    expect(restaurant.name).toBe('Test Restaurant');
  });

  test('User  cannot see details of a non-existent restaurant', async () => {
    DicodingRestaurantApi.detailRestaurant.mockRejectedValue(new Error('Restaurant not found'));

    await expect(DicodingRestaurantApi.detailRestaurant(9999)).rejects.toThrow('Restaurant not found');
  });
});