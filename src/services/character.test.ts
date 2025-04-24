
import { fetchCharacters } from './character';

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('Character Service', () => {
  test('fetchCharacters returns data successfully', async () => {
    const mockResponse = {
      info: { count: 2, pages: 1, next: null, prev: null },
      results: [
        { id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human' },
        { id: 2, name: 'Morty Smith', status: 'Alive', species: 'Human' }
      ]
    };

    // Mock the fetch implementation for this test
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })
    );

    const result = await fetchCharacters(1);

    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('https://rickandmortyapi.com/api/character?page=1'),
      expect.any(Object)
    );
  });

  test('fetchCharacters handles 404 gracefully', async () => {
    // Mock a 404 response
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      })
    );

    const result = await fetchCharacters(100);

    expect(result.results).toEqual([]);
    expect(result.info.count).toBe(0);
  });
});
