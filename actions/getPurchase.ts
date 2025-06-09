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


export const getPurchasedHomeCourses = async (
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
      take: 4,
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

export async function getLastPurchasedCourse(limit: number = 10) {
  const purchases = await prisma.purchase.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
    include: {
      course: {
        select: {
          title: true,
          slug: true,
          price: true,
        },
      },
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  return purchases;
}