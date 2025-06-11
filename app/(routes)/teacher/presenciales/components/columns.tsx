"use client"

import { Course } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"


export type Payment = {
  id: string
  userEmail: string
  userName: string
  phone: string
  course: Course
}

export const columns: ColumnDef<Payment>[] = [
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
  },
]