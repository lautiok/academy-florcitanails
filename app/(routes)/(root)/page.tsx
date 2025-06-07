import { getHomeCourses } from "@/actions/getCourses";
import { ListCourses } from "@/components/Shared";

export default async function Home() {
    const listCourses = await getHomeCourses();

  return (
    <div >
        <ListCourses title="Cursos" courses={listCourses} />
    </div>
  );
};