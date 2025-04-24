
import { Skeleton } from "@/components/ui/skeleton";

export const CharacterImageSkeleton = () => {
  return (
    <div className="aspect-square overflow-hidden">
      <Skeleton className="w-full h-full" />
    </div>
  );
};
