import { Skeleton } from "@/components/ui/skeleton";
import { Cog, FileImage, DollarSign, ListCheck } from "lucide-react";

export default function CourseEditSkeleton() {
  return (
    <div className="space-y-6 p-6">

      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-36" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>

      <div className="p-6 border rounded-lg bg-white">
        <div className="flex items-center gap-2 mb-4">
          <Cog className="h-5 w-5 text-gray-400" />
          <Skeleton className="h-6 w-48" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
        <Skeleton className="mt-6 h-10 w-36" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 border rounded-lg bg-white space-y-4">
          <div className="flex items-center gap-2">
            <FileImage className="h-5 w-5 text-gray-400" />
            <Skeleton className="h-6 w-40" />
          </div>
          <Skeleton className="h-[180px] w-full rounded-lg" />
          <Skeleton className="h-8 w-full" />
        </div>
        <div className="p-6 border rounded-lg bg-white space-y-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-gray-400" />
            <Skeleton className="h-6 w-40" />
          </div>
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <div className="p-6 border rounded-lg bg-white space-y-4">
        <div className="flex items-center gap-2">
          <ListCheck className="h-5 w-5 text-gray-400" />
          <Skeleton className="h-6 w-40" />
        </div>
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-36" />
        </div>
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex justify-between items-center p-4 border rounded-md">
              <Skeleton className="h-4 w-40" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
