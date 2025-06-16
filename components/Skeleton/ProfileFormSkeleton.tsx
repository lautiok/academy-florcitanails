import { Skeleton } from "@/components/ui/skeleton";
import { User } from "lucide-react";

export const ProfileFormSkeleton = () => {
  return (
      <div className="p-6 bg-white rounded-md border border-slate-200">
        <div className="flex items-center mb-6 gap-2">
          <div className="p-2 rounded-full bg-violet-400">
            <User className="h-5 w-5 text-white" />
          </div>
          <Skeleton className="h-6 w-32" />
        </div>

        <div className="flex items-center gap-4 mb-6 mt-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div>
            <Skeleton className="h-4 w-20 mb-1" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Skeleton className="h-4 w-16 mb-1" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div>
            <Skeleton className="h-4 w-16 mb-1" />
            <Skeleton className="h-10 w-full" />
          </div>

          <Skeleton className="h-10 w-40" />
        </div>
      </div>
  );
};
