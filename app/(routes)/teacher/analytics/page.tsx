import { Metadata } from "next";
import { Payments, SuscriptersCharts, TotalRevenues } from "./components";
export const metadata: Metadata = {
  title: "Analiticas | Profesor | Academy Florcitanails",
  description:
    "Plataforma de aprendizaje en línea para los estudiantes de la Academia de Florcitanails",
};

export default function Analytics() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <SuscriptersCharts />
        <TotalRevenues />
      </div>
      <Payments />
    </div>
  );
}