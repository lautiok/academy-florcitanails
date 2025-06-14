import { getCourses } from "@/actions/getCourses";
import { ListCourses } from "@/components/Shared";

export async function ListCoursesComponents() {
        const listCourses = await getCourses();

        if(!listCourses) {
            return <div>No hay cursos</div>
        }
    
    return  <ListCourses title="Todos los cursos" courses={listCourses} />
    
}