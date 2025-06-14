import { Course } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"

export type Payment = {
  id: string
  userEmail: string
  userName: string
  phone: string
  course: Course
}

export const columns = (onDelete: (id: string) => void): ColumnDef<Payment>[] => [
  {
    accessorKey: "userName",
    header: "Nombre",
  },
  {
    accessorKey: "userEmail",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Teléfono",
  },
  {
    accessorKey: "course.title",
    header: "Curso",
    cell: ({ row }) => row.original.course.title,
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => (
      <Button
        variant="outline"
        size="sm"
        onClick={() => onDelete(row.original.id)}
      >
        <Trash className="h-4 w-4" />
      </Button>
    ),
  },
]
