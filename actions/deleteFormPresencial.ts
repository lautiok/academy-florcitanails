"use server"

import { prisma } from "@/lib/prisma"

export async function deleteFormPresencial(id: string) {
  await prisma.formPresencial.delete({
    where: { id },
  })
}
