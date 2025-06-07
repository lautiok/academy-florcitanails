import { prisma } from "@/lib/prisma";
import { Chapter, Course } from "@prisma/client";

export const getPurchaseCourseById = async (
  userId: string,
  courseId: string
): Promise<boolean> => {
  try {
    const purchase = await prisma.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
      include: {
        course: true,
      },
    });
    return !!purchase;
  } catch (error) {
    console.error("Error al obtener el curso de compra:", error);
    return false;
  }
};

export const getIsPurchasedCourse = async (
  userId: string,
  courseId: string
): Promise<boolean> => {
  try {
    const purchase = await prisma.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    return !!purchase;
  } catch (error) {
    console.error("Error al obtener el curso de compra:", error);
    return false;
  }
};

export const getPurchasedCourses = async (
  userId: string
): Promise<(Course & { chapters: Chapter[] })[] | null> => {
  try {
    const purchasedCourses = await prisma.course.findMany({
      where: {
        isPublished: true,
        purchases: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        chapters: {
          where: {
            isPublished: true,
          },
        },
      },
    });

    return purchasedCourses;
  } catch (error) {
    console.error("Error al obtener el curso de compra:", error);
    return null;
  }
};
