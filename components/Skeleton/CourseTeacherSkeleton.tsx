import { Skeleton } from "@/components/ui/skeleton";

export const CourseTeacherSkeleton = () => {
  return (
    <div className="flex flex-col my-4 mx-6 border rounded-lg p-4 gap-10">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="border border-slate-200 rounded-md p-4 animate-pulse space-y-4">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-[180px] w-full rounded-md" />
        </div>
      ))}
    </div>
  );
};
