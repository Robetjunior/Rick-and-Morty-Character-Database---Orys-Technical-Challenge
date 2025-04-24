
import { createContext, useContext, ReactNode, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchCharacters } from "@/services/character";
import { Character } from "@/types/character";
import { useToast } from "@/hooks/use-toast";

type CharacterContextType = {
  characters: Character[];
  isLoading: boolean;
  isError: boolean;
  isPending: boolean;
  isFetching: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  error: Error | null;
  refetch: () => Promise<any>;
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
    isPending,
    isFetching,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["characters", searchTerm],
    queryFn: ({ pageParam = 1 }) => fetchCharacters(pageParam, searchTerm),
    getNextPageParam: (lastPage) =>
      lastPage.info.next
        ? parseInt(new URL(lastPage.info.next).searchParams.get("page") || "1")
        : undefined,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
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
    isPending,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
    refetch,
  };

  return (
    <CharacterContext.Provider value={value}>{children}</CharacterContext.Provider>
  );
};
