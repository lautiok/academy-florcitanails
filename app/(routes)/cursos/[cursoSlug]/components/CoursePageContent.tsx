import { getCourse } from "@/dal/Courses";
import { getPurchaseCourseById } from "@/dal/Purchase";
import { auth } from "@/lib/auth";
import { BreadCrumbCourse } from "./breadCrumbCourse";
import { HeroBlockCourse } from "./heroBlockCourse";
import { CourseContent } from "./courseContent";

export async function CoursePageContent({ cursoSlug }: { cursoSlug: string }) {
    
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
        <HeroBlockCourse course={curse} PurchasedCourse={Purchased} slug={cursoSlug} />
      </div>
      <div className="my-4 mx-6 border rounded-lg border-slate-200 p-6">
        <CourseContent chapters={curse.chapters} />
      </div>
    </div>
  );
}