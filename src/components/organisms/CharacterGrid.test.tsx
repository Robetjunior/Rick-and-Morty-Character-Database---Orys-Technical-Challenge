import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CharacterGrid } from "./CharacterGrid";
import { Character } from "@/types/character";

// Mock dependencies
jest.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

jest.mock("@/components/molecules/CharacterCard", () => ({
  CharacterCard: ({ character }: { character: Character }) => (
    <div data-testid={`character-card-${character.id}`}>{character.name}</div>
  ),
}));

jest.mock("@/components/organisms/CharacterCardSkeletonGrid", () => ({
  CharacterCardSkeletonGrid: () => <div data-testid="skeleton-grid">Loading...</div>,
}));

describe("CharacterGrid", () => {
  const mockCharacters: Character[] = [
    {
      id: 1,
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
      type: "",
      gender: "Male",
      origin: {
        name: "Earth",
        url: "https://rickandmortyapi.com/api/location/1",
      },
      location: {
        name: "Earth",
        url: "https://rickandmortyapi.com/api/location/1",
      },
      image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      episode: ["https://rickandmortyapi.com/api/episode/1"],
      url: "https://rickandmortyapi.com/api/character/1",
      created: "2017-11-04T18:48:46.250Z",
    },
    {
      id: 2,
      name: "Morty Smith",
      status: "Alive",
      species: "Human",
      type: "",
      gender: "Male",
      origin: {
        name: "Earth",
        url: "https://rickandmortyapi.com/api/location/1",
      },
      location: {
        name: "Earth",
        url: "https://rickandmortyapi.com/api/location/1",
      },
      image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
      episode: ["https://rickandmortyapi.com/api/episode/1"],
      url: "https://rickandmortyapi.com/api/character/2",
      created: "2017-11-04T18:50:21.651Z",
    },
  ];

  test("renders loading skeleton when isLoading is true", () => {
    render(<CharacterGrid characters={[]} isLoading={true} />);
    expect(screen.getByTestId("skeleton-grid")).toBeInTheDocument();
  });

  test("renders no characters found message when characters array is empty", () => {
    render(<CharacterGrid characters={[]} isLoading={false} />);
    expect(screen.getByText("common.noCharactersFound")).toBeInTheDocument();
  });

  test("renders character cards when characters are provided", () => {
    render(<CharacterGrid characters={mockCharacters} isLoading={false} />);
    
    expect(screen.getByTestId("character-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("character-card-2")).toBeInTheDocument();
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Morty Smith")).toBeInTheDocument();
  });
});
