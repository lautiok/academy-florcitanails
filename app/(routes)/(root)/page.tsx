import { Suspense } from "react";
import { LatestCourses, PurchasedCourses } from "./components";
import { ListCoursesSkeleton } from "@/components/Skeleton/ListCoursesSkeleton";
export default async function Home() {
  return (
    <div>
      <Suspense fallback={<ListCoursesSkeleton title="Mis cursos"/>}>
        <PurchasedCourses />
      </Suspense>
      <Suspense fallback={<ListCoursesSkeleton title="Ultimos cursos"/> }>
      <LatestCourses/>
      </Suspense>
    </div>
  );
}
