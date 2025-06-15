import { Skeleton } from "@/components/ui/skeleton";

export const CourseContentSkeleton = () => {
  return (
    <div>
      <h2 className="text-3xl font-semibold mb-4 pb-4">Contenido del curso</h2>
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 border rounded-lg border-slate-200 p-2"
          >
            <div className="flex-shrink-0 bg-muted rounded-full w-8 h-8 flex items-center justify-center">
              <Skeleton className="w-6 h-6 rounded-full" />
            </div>
            <div className="flex-1">
              <Skeleton className="h-5 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
