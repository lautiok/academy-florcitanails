import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export const TakeExamSkeleton = () => {
  return (
    <div className="space-y-6">
      <Skeleton className="h-6 w-1/2" />

      {[...Array(3)].map((_, index) => (
        <Card key={index} className="p-4 space-y-3">
          <Skeleton className="h-4 w-3/4" />

          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center space-x-2">
                <Skeleton className="w-4 h-4 rounded-full" />
                <Skeleton className="h-4 w-1/3" />
              </div>
            ))}
          </div>
        </Card>
      ))}

      <Skeleton className="h-10 w-40 mt-4" />
    </div>
  );
};
