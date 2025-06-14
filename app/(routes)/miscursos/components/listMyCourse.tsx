import { getPurchasedCourses } from "@/actions/getPurchase";
import { ListCourses } from "@/components/Shared";
import { auth } from "@/lib/auth";

export async function ListMyCourse() {
    const session = await auth();
    if (!session) {
        return <div>No tienes sesión</div>;
    }

    const course = await getPurchasedCourses(session.user.id);
    
        if (!course) {
            return <div>No tienes cursos</div>;
        }
    

    return <ListCourses title="Mis cursos" courses={course} />

}