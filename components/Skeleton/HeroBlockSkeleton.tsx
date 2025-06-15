"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const HeroBlockCourseSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-2 rounded-xl bg-white dark:bg-slate-900">
      {/* Parte izquierda: texto */}
      <div className="flex flex-col justify-center space-y-4">
        <Skeleton className="h-8 w-3/4" /> {/* título */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" /> {/* descripción */}
        <Skeleton className="h-6 w-24 my-3" /> {/* precio */}
        <Skeleton className="h-10 w-40" /> {/* botón */}
      </div>

      {/* Parte derecha: imagen */}
      <div className="flex justify-center items-center">
        <Skeleton className="rounded-xl shadow-md w-full max-h-[400px] h-[300px]" />
      </div>
    </div>
  );
};
