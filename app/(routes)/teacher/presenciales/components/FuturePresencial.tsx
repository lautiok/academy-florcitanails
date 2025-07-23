import { getFormPresencials } from "@/dal/FormPresencial";
import FuturePresencialClient from "./FuturePresencialClient";
import { TitleBlock } from "@/components/Shared";
import { BellRing } from "lucide-react";

export default async function FuturePresencial() {
  const data = await getFormPresencials();

  if (!data) {
    return <div>No hay formularios presenciales</div>
  }

  return (
      <div className="p-6">
        <TitleBlock title="Notificaciones" icon={BellRing} />
        <FuturePresencialClient data={data} />
      </div>
  )
} 