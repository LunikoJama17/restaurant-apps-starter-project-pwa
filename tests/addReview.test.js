// tests/addReview.test.js
import DicodingRestaurantApi from '../src/scripts/data/dicoding-restaurant-api';

describe('Add Review', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('User  can add a review for a restaurant', async () => {
    const reviewData = {
      id: 1,
      name: 'John Doe',
      review: 'This restaurant is amazing!',
    };

    const mockResponse = {
      status: 'success',
      message: 'Review added successfully',
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    );

    const response = await fetch('https://restaurant-api.dicoding.dev/review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    });

    const result = await response.json();
    expect(result).toEqual(mockResponse);
    expect(result.status).toBe('success');
  });

  test('User  cannot add a review without filling the form', async () => {
    const reviewData = {
      id: 1,
      name: '',
      review: '',
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Failed to add review' }),
      })
    );

    const response = await fetch('https://restaurant-api.dicoding.dev/review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    });

    const result = await response.json();
    expect(result.message).toBe('Failed to add review');
  });
});