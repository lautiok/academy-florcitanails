import { Suspense } from "react";
import { Nav, PresencialesHeader } from "./components";
import FuturePresencial from "./components/FuturePresencial";
import { PresencialesSkeleton } from "@/components/Skeleton/PresencialesSkeleton";

export default function TeacherPresenciales() {
  return (
    <div className="p-6">
      <PresencialesHeader />
      <Nav />
       <Suspense fallback={<PresencialesSkeleton  />}>
        <FuturePresencial />
      </Suspense>
    </div>
  );
}
