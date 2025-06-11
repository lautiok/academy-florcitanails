import { prisma } from "@/lib/prisma";

export const getFormPresencials = async () => {
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