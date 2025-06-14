import { getPurchasedHomeCourses } from "@/dal/Purchase";
import { ListCourses } from "@/components/Shared";
import { auth } from "@/lib/auth"

export async function PurchasedCourses() {
    const session = await auth()

    if (!session) {
        return <div>No tienes session</div>
    }

    const coursesPurchased = await getPurchasedHomeCourses(session.user.id);

    if (!coursesPurchased) {
        return <div>No hay cursos</div>
    }

    return <ListCourses title="Mis cursos" courses={coursesPurchased} />

}