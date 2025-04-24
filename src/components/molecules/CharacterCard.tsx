import { memo } from "react";
import { Character } from "@/types/character";
import { Card, CardContent } from "@/components/ui/card";
import { CharacterImage } from "@/components/atoms/CharacterImage";
import { StatusIndicator } from "@/components/atoms/StatusIndicator";
import { useTranslation } from "react-i18next";

interface CharacterCardProps {
  character: Character;
  className?: string;
}

export const CharacterCard = memo(
  ({ character, className }: CharacterCardProps) => {
    const { t } = useTranslation();
    
    const getSpeciesTranslation = (species: string) => {
      const lowerSpecies = species.toLowerCase();
      if (lowerSpecies === 'human' || lowerSpecies === 'alien') {
        return t(`character.species.${lowerSpecies}`);
      }
      return species;
    };

    const translatedStatus = t(`character.status.${character.status.toLowerCase()}`);

    return (
      <Card 
        className={`overflow-hidden transition-all duration-300 hover:scale-105 focus-within:ring-2 focus-within:ring-primary ${className}`}
        tabIndex={0}
        role="article"
        aria-labelledby={`character-name-${character.id}`}
      >
        <CharacterImage 
          src={character.image} 
          alt={`${t('accessibility.imageAlt')} ${character.name}: ${translatedStatus}`} 
        />
        <CardContent className="p-3 md:p-4">
          <h2 
            id={`character-name-${character.id}`}
            className="text-lg md:text-xl font-bold truncate"
          >
            {character.name}
          </h2>
          <div 
            className="flex flex-col gap-1 mt-1" 
            aria-label={t('common.characterDetails')}
          >
            <StatusIndicator status={character.status} />
            <p className="text-sm text-gray-600">{getSpeciesTranslation(character.species)}</p>
          </div>
        </CardContent>
      </Card>
    );
  }
);

CharacterCard.displayName = "CharacterCard";
