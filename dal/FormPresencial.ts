"use server"

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation";

export const getFormPresencials = async () => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
    try {
        const formPresencials = await prisma.formPresencial.findMany(
            {
                orderBy: {
                    createdAt: "desc",
                },

                include: {
                    course: true,
                },
            }
        );
        return formPresencials;
    } catch (error) {
        console.error("Error al obtener formularios presenciales:", error);
        return [];
    }
};

export async function deleteFormPresencial(id: string) {
  
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  try {
    await prisma.formPresencial.delete({
    where: { id },
  })
    return true
  } catch (error) {
    console.error("Error al eliminar el formulario:", error)
    return null
  }
}
