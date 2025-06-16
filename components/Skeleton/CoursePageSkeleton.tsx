import { Skeleton } from "@/components/ui/skeleton";

export const CoursePageSkeleton = () => {
  return (
      <div className="grid grid-cols-1 md:grid-cols-[65%_1fr] gap-4">
        <div className="space-y-4">
          <Skeleton className="w-full h-[300px] rounded-lg" /> 
          <Skeleton className="w-3/4 h-6" />
          <Skeleton className="w-1/2 h-4" />
          <Skeleton className="w-full h-10" />
        </div>

        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center space-x-3 border border-slate-200 p-2 rounded-md"
            >
              <Skeleton className="w-8 h-8 rounded-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </div>
  );
};
