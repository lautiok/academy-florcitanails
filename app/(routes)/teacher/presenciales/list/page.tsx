import { Suspense } from "react";
import { PresencialesSkeleton } from "@/components/Skeleton/PresencialesSkeleton";
import { Nav, Presenciales, PresencialesHeader } from "../components";

export default function ListPresenciales() {
  return (
    <div className="p-6">
      <PresencialesHeader />
      <Nav />
       <Suspense fallback={<PresencialesSkeleton  />}>
            <Presenciales />
      </Suspense>
    </div>
  );
}
