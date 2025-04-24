import { memo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface CharacterImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const CharacterImage = memo(({ src, alt, className = "" }: CharacterImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`aspect-square overflow-hidden ${className}`} aria-hidden={isLoading}>
      {isLoading && (
        <Skeleton className="w-full h-full" />
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ease-in-out ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={(e) => {
          setHasError(true);
          setIsLoading(false);
          (e.target as HTMLImageElement).src = "https://rickandmortyapi.com/api/character/avatar/1.jpeg";
        }}
      />
    </div>
  );
});

CharacterImage.displayName = "CharacterImage";
