
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CharacterImageSkeleton } from "../atoms/CharacterImageSkeleton";

export const CharacterCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <CharacterImageSkeleton />
      <CardContent className="p-3 md:p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-1" />
        <Skeleton className="h-4 w-1/3" />
      </CardContent>
    </Card>
  );
};
