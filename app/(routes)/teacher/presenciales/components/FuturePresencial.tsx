import { getFormPresencials } from "@/dal/FormPresencial";
import FuturePresencialClient from "./FuturePresencialClient";

export default async function FuturePresencial() {
  const data = await getFormPresencials();

  if (!data) {
    return <div>No hay formularios presenciales</div>
  }

  return <FuturePresencialClient data={data} />
}