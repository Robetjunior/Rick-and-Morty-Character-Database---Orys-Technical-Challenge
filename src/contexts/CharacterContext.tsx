import { createContext, useContext, ReactNode, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCharacters } from "@/services/character";
import { Character } from "@/types/character";
import { useToast } from "@/hooks/use-toast";

type CharacterContextType = {
  characters: Character[];
  isLoading: boolean;
  isError: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
};

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export const useCharacters = () => {
  const context = useContext(CharacterContext);
  if (context === undefined) {
    throw new Error("useCharacters must be used within a CharacterProvider");
  }
  return context;
};

export const CharacterProvider = ({
  children,
  searchTerm,
}: {
  children: ReactNode;
  searchTerm: string;
}) => {
  const { toast } = useToast();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["characters", searchTerm],
    queryFn: ({ pageParam = 1 }) => fetchCharacters(pageParam, searchTerm),
    getNextPageParam: (lastPage) =>
      lastPage.info.next
        ? parseInt(new URL(lastPage.info.next).searchParams.get("page") || "1")
        : undefined,
    initialPageParam: 1,
    meta: {
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to fetch characters. Please try again.",
          variant: "destructive",
        });
      },
    },
  });

  // Memoize characters to prevent unnecessary rerenders
  const characters = useMemo(() => {
    return data?.pages.flatMap((page) => page.results) || [];
  }, [data]);

  const value = {
    characters,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  };

  return (
    <CharacterContext.Provider value={value}>{children}</CharacterContext.Provider>
  );
};
