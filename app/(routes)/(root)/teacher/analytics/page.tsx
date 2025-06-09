import { Payments, SuscriptersCharts, TotalRevenues } from "./components";

export default function Analytics() {
  return <div className="p-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <SuscriptersCharts />

        <TotalRevenues />
    </div>

    <Payments />
  </div>;
}