import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CharacterProvider, useCharacters } from './CharacterContext';
import * as characterService from '@/services/character';

jest.mock('@/services/character');

function TestComponent() {
  const { characters, isLoading } = useCharacters();
  return (
    <div>
      <div data-testid="loading-state">{isLoading ? 'Loading' : 'Not Loading'}</div>
      <div data-testid="characters-count">{characters.length}</div>
      {characters.length > 0 && <div data-testid="first-character">{characters[0].name}</div>}
    </div>
  );
}

describe('CharacterContext', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  beforeEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  test('fetches characters and updates state correctly', async () => {
    const mockCharacters = {
      info: { count: 2, pages: 1, next: null, prev: null },
      results: [
        { id: 1, name: 'Rick Sanchez', status: 'Alive', species: 'Human' },
        { id: 2, name: 'Morty Smith', status: 'Alive', species: 'Human' }
      ]
    };

    (characterService.fetchCharacters as jest.Mock).mockResolvedValue(mockCharacters);

    render(
      <QueryClientProvider client={queryClient}>
        <CharacterProvider searchTerm="">
          <TestComponent />
        </CharacterProvider>
      </QueryClientProvider>
    );

    expect(screen.getByTestId('loading-state')).toHaveTextContent('Loading');

    await waitFor(() => {
      expect(screen.getByTestId('loading-state')).toHaveTextContent('Not Loading');
    });
    
    expect(screen.getByTestId('characters-count')).toHaveTextContent('2');
    expect(screen.getByTestId('first-character')).toHaveTextContent('Rick Sanchez');
  });
});
