import { Suspense } from "react";
import { PresencialesHeader } from "./components";
import FuturePresencial from "./components/FuturePresencial";
import { PresencialesSkeleton } from "@/components/Skeleton/PresencialesSkeleton";

export default function TeacherPresenciales() {
  return (
    <div className="p-6">
       <Suspense fallback={<PresencialesSkeleton  />}>
      <PresencialesHeader />
        <FuturePresencial />
      </Suspense>
    </div>
  );
}
