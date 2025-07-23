"use client"

import { useRouter } from "next/navigation"
import { deleteFormPresencial } from "@/dal/FormPresencial"
import { DataTable } from "../../analytics/components/data-table"
import { Payment } from "./data-table"
import { columns } from "./columns"

export default function FuturePresencialClient({ data }: { data: Payment[] }) {
  const router = useRouter()

  const handleDelete = async (id: string) => {
    await deleteFormPresencial(id)
    router.refresh() 
  }

  return (
    <div className="container mx-auto">
      <DataTable columns={columns(handleDelete)} data={data}/>
    </div>
  )
}
