import { getCourse } from "@/actions/getCourses";
import { BreadCrumbCourse, CourseContent, HeroBlockCourse } from "./components";
import { getPurchaseCourseById } from "@/actions/getPurchase";
import { auth } from "@/lib/auth";

export default async function cursosSlug({
  params,
}: {
  params: Promise<{ cursoSlug: string }>;
}) {
  const { cursoSlug } = await params;
  const curse = await getCourse(cursoSlug);

  if (!curse) {
    return <div>Curso no encontrado</div>;
  }

  const session = await auth();

  if (!session) {
    return <div>No tienes permisos para ver este curso</div>;
  }
  const Purchased = await getPurchaseCourseById(session.user.id, curse.id);

  return (
    <div className="max-w-6xl mx-auto">
        <div className="my-4 mx-6 border rounded-lg border-slate-200 p-6">
            <BreadCrumbCourse title={curse.title} />
            <HeroBlockCourse course={curse} PurchasedCourse={Purchased} />
        </div>
        <div className="my-4 mx-6 border rounded-lg border-slate-200 p-6">
                <CourseContent chapters={curse.chapters} />
            </div>
    </div>
  );
};