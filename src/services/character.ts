
import { CharacterResponse } from "@/types/character";

const API_URL = "https://rickandmortyapi.com/api/character";

export const fetchCharacters = async (page: number, name?: string): Promise<CharacterResponse> => {
  const params = new URLSearchParams();
  if (page) params.append("page", page.toString());
  if (name) params.append("name", name);
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(`${API_URL}?${params.toString()}`, {
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      // For 404 (not found), return empty results instead of error
      if (response.status === 404) {
        console.info('No characters found with the current filter');
        return {
          info: {
            count: 0,
            pages: 0,
            next: null,
            prev: null,
          },
          results: [],
        };
      }
      
      const errorMessage = `API error: ${response.status} ${response.statusText}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
    
    const data = await response.json();
    return data;
    
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      console.warn("Request was aborted due to timeout");
      throw new Error("Request timed out. Please try again.");
    }
    
    console.error('Error fetching characters:', error);
    throw error;
  }
};

export const getCharacterById = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error(`Character with ID ${id} not found`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching character:', error);
    throw error;
  }
};

export const prefetchNextPage = async (page: number, name?: string): Promise<void> => {
  try {
    await fetchCharacters(page, name);
    console.info(`Prefetched page ${page} with name filter: ${name || 'none'}`);
  } catch (error) {
    // Silently fail on prefetch errors
    console.warn('Prefetch failed, will retry on demand', error);
  }
};
