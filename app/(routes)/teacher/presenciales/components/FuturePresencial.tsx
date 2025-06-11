import { getFormPresencials } from "@/actions/getFormPresencial";
import { columns, Payment } from "./columns"
import { DataTable } from "./data-table"
 

 
export default async function FuturePresencial() {
  const data = await getFormPresencials();

  if (!data) {
    return <div>No hay formularios presenciales</div>
  }
 
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}