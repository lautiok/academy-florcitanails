import { prisma } from "@/lib/prisma";
import { subMonths, startOfMonth, endOfMonth, format } from "date-fns";
import { es } from "date-fns/locale";

export async function getRevenuesByMonth() {
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
}
