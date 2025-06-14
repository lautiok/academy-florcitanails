import { getLastPurchasedCourse } from "@/dal/Purchase";
import { DataTable } from "./data-table";
import { columns, Payment } from "./columns";

export async function Payments () {
    const lastPurchasedCourses = await getLastPurchasedCourse();
    return <div className="mx-auto my-10 w-full border border-slate-200 rounded-lg">
        <DataTable columns={columns} data={lastPurchasedCourses as Payment[]} />
    </div>
};