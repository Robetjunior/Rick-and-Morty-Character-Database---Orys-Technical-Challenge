
import { memo } from "react";
import { Character } from "@/types/character";
import { CharacterCard } from "@/components/molecules/CharacterCard";
import { CharacterCardSkeletonGrid } from "@/components/organisms/CharacterCardSkeletonGrid";
import { useTranslation } from "react-i18next";

interface CharacterGridProps {
  characters: Character[];
  isLoading: boolean;
}

export const CharacterGrid = memo(
  ({ characters, isLoading }: CharacterGridProps) => {
    const { t } = useTranslation();

    if (isLoading) {
      return <CharacterCardSkeletonGrid />;
    }

    if (characters.length === 0 && !isLoading) {
      return (
        <div 
          className="flex justify-center items-center p-8" 
          aria-live="polite"
        >
          <p className="text-lg text-gray-500" role="status">
            {t('common.noCharactersFound')}
          </p>
        </div>
      );
    }

    return (
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        role="grid"
        aria-label={t('common.characterList')}
      >
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    );
  }
);

CharacterGrid.displayName = "CharacterGrid";
