import { prisma } from "@/lib/prisma";
import { format, subMonths, startOfMonth} from "date-fns";
import {es} from "date-fns/locale";


export async function getSuscribersbyMonth() {
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
}
