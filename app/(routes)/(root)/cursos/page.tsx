import { getCourses } from "@/actions/getCourses";
import { ListCourses } from "@/components/Shared";

export default async function CursosPage() {
    const listCourses = await getCourses();
    return (
        <div>
            <ListCourses title="Todos los cursos" courses={listCourses} />
        </div>
    );
}