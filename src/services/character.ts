
import { CharacterResponse } from "@/types/character";

const API_URL = "https://rickandmortyapi.com/api/character";

/**
 * Fetches characters from Rick and Morty API with pagination and filtering
 * @param page Current page number
 * @param name Optional name filter
 * @returns Promise with character data
 */
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
    // Handle abort errors separately to avoid unnecessary error reporting
    if (error instanceof DOMException && error.name === "AbortError") {
      console.warn("Request was aborted due to timeout");
      throw new Error("Request timed out. Please try again.");
    }
    
    console.error('Error fetching characters:', error);
    throw error;
  }
};

/**
 * Get character by ID
 * @param id Character ID
 * @returns Promise with character data
 */
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

/**
 * Prefetches character data for better user experience
 * This can be used to preload the next page of results
 */
export const prefetchNextPage = async (page: number, name?: string): Promise<void> => {
  try {
    await fetchCharacters(page, name);
    console.info(`Prefetched page ${page} with name filter: ${name || 'none'}`);
  } catch (error) {
    // Silently fail on prefetch errors
    console.warn('Prefetch failed, will retry on demand', error);
  }
};
