
import { CharacterCardSkeleton } from "../molecules/CharacterCardSkeleton";

export const CharacterCardSkeletonGrid = () => {
  return (
    <>
      {[...Array(8)].map((_, i) => (
        <CharacterCardSkeleton key={i} />
      ))}
    </>
  );
};
