import { Skeleton } from "@/components/ui/skeleton";
import { Award } from "lucide-react";

export const ListCertificateSkeleton = () => {
  return (
        <>
      <div className="flex items-center gap-1 mb-4">
        <div className="p-2 rounded-full bg-emerald-500 text-white">
          <Award className="h-4 w-4" />
        </div>
        <Skeleton className="h-5 w-32" />
      </div>

      <div className="grid grid-cols-1 gap-5">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="border border-slate-200 rounded-md p-4 flex justify-between flex-col md:flex-row gap-2 animate-pulse"
          >
            <div className="flex gap-4 flex-col md:flex-row items-center md:items-start">
              <Skeleton className="w-full h-[180px] md:w-[100px] md:h-[100px] rounded-md" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-64" />
                <Skeleton className="h-4 w-56" />
              </div>
            </div>
            <div className="min-w-[120px] mt-2 md:mt-0">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-2.5 w-full rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
