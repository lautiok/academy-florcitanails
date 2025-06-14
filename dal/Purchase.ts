import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Chapter, Course } from "@prisma/client";
import { endOfMonth, format, startOfMonth, subMonths } from "date-fns";
import { es } from "date-fns/locale";
import { redirect } from "next/navigation";

export const getPurchaseCourseById = async (
  userId: string,
  courseId: string
): Promise<boolean> => {
  
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
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
  
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
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

  
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

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


  const session = await auth();
  if (!session) {
    redirect("/login");
  }


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

  
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  try {
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
  } catch (error) {
    console.error("Error al obtener el curso de compra:", error);
    return null;
  }
}

export async function getRevenuesByMonth() {
  
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  try {
    const now = new Date();

  const months = Array.from({ length: 6 }, (_, i) => subMonths(now, 5 - i));

  const result = await Promise.all(
    months.map(async (month) => {
      const start = startOfMonth(month);
      const end = endOfMonth(month);

      const purchases = await prisma.purchase.findMany({
        where: {
          createdAt: {
            gte: start,
            lt: end,
          },
        },
        include: {
          course: {
            select: {
              price: true,
            },
          },
        },
      });

      const totalRevenue = purchases.reduce((acc, purchase) => {
        const price = parseFloat(purchase.course?.price ?? "0");
        return acc + (isNaN(price) ? 0 : price);
      }, 0);

      return {
        month: format(start, "LLLL", { locale: es }),
        revenue: Number(totalRevenue.toFixed(2)),
      };
    })
  );

  return result;
  } catch (error) {
    console.error("Error al obtener el curso de compra:", error);
    return null;
  }
}

export async function getSuscribersbyMonth() {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
    try {
      const now = new Date();
    const sixMonthsAgo = subMonths(now, 5);

    const purchases = await prisma.purchase.findMany({
        where: {
            createdAt: {
                gte: startOfMonth(sixMonthsAgo),
            },
        },
        select: {
            createdAt: true,
        },
    });

    const months = Array.from({length: 6}, (_, i) => {
        const data = subMonths(now, 5-i);

        return {
            month: format(data, "LLLL", { locale: es }),
            count: 0,
            data: format(data, "yyyy-MM"),
        }
    } )

    purchases.forEach((purchase) => {
        const purchaseMonth = format(purchase.createdAt, "yyyy-MM");
        const month = months.find((month) => month.data === purchaseMonth);
        if (month) {
            month.count+=1;
        }
    });

    return months.map(({ month, count}) => ({
        month,
        users: count,
    }) );
    } catch (error) {
        console.error("Error al obtener el curso de compra:", error);
        return null;
    }
}
