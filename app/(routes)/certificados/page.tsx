import { Metadata } from "next"
import { CertificadosContent } from "./components/certificadosContent";
import { Suspense } from "react";
import { ListCertificateSkeleton } from "@/components/Skeleton/ListCertificateSkeleton";

export const metadata: Metadata = {
  title: "Certificados | Academy Florcitanails",
  description: "Plataforma de aprendizaje en línea para los estudiantes de la Academia de Florcitanails",
};

export default async function CertificadosPage() {

    return (
        <div className="m-6 p-6 border border-slate-200 rounded-md">
            <Suspense fallback={<ListCertificateSkeleton />}>
                <CertificadosContent/>
            </Suspense>
        </div>
    )
}