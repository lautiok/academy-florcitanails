import { getHomeCourses } from "@/dal/Courses";
import { ListCourses } from "@/components/Shared";

export async function LatestCourses() {
      const listCourses = await getHomeCourses();
      if(!listCourses) {
        return <div>No hay cursos</div>
      }
    return <ListCourses title="Ultimos cursos" courses={listCourses} />
    }