import { getHomeCourses } from "@/actions/getCourses";
import { getPurchasedHomeCourses } from "@/actions/getPurchase";
import { ListCourses } from "@/components/Shared";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();

  if (!session) {
    return <div>No tienes sesión</div>;
  }
  const listCourses = await getHomeCourses();
  const coursesPurchased = await getPurchasedHomeCourses(session.user.id);

  return (
    <div>
      <ListCourses title="Mis cursos" courses={coursesPurchased} />
      <ListCourses title="Ultimos cursos" courses={listCourses} />
    </div>
  );
}
