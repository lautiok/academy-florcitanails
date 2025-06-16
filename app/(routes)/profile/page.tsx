import { Metadata } from "next";
import { Suspense } from "react";
import { ProfilePageContent } from "./components/profilePageContent";
import { ProfileFormSkeleton } from "@/components/Skeleton/ProfileFormSkeleton";

export const metadata: Metadata = {
  title: "Perfil | Academy Florcitanails",
  description: "Plataforma de aprendizaje en línea para los estudiantes de la Academia de Florcitanails",
};

export default async function ProfilePage() {
    
  return (
    <div className="m-6">
        <Suspense fallback={<ProfileFormSkeleton />}>
            <ProfilePageContent/>
        </Suspense>
    </div>
  )
}