import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const getUsers = async () => {

    const session = await auth();
    if (!session) {
        throw new Error("No estás logueado");
    }

    if (session.user.role !== "admin") {
        throw new Error("No tienes permisos");
    }
    try {
        const users = await prisma.user.findMany(
            {
                orderBy: {
                    createdAt: "desc",
                },
            }
        );
        return users;
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        return [];
    }
};