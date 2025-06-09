"use client"

import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table"

export type Payment = {
id : string;
userId: string;
user: User;
course : {
    title: string;
    slug: string;
    price: string;
};
courseId: string;
price : number;
createdAt: Date;
updatedAt: Date;

}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "createdAtformatted",
    header: "Fecha de compra",
    cell: ({ row }) => {
        const date = new Date(row.original.createdAt).toLocaleDateString("es-ES");
        return date
    }
  },
  {
    accessorKey: "userEmail",
    header: "cliente",
    accessorFn: (row) => row.user?.email ?? "Sin email",
  },
  {
    accessorKey: "course.title",
    header: "Curso",
  },
  {
    accessorKey: "course.price",
    header: "Precio",
  }
]