import { getPurchasedCourses } from "@/dal/Purchase";
import { getUserProgressByCourse } from "@/dal/UserProgress";
import { auth } from "@/lib/auth";
import { Award } from "lucide-react";
import { ListCertificate } from "./listCertificate";

export async function CertificadosContent() {
  const session = await auth();
  if (!session) {
    return <div>No tienes sesión</div>;
  }
  const courses = await getPurchasedCourses(session.user.id);

  if (!courses) {
    return null;
  }

  const name = session.user.name;

  if (!name) {
    return null;
  }

  const coursesWithProgress = await Promise.all(
    courses.map(async (course) => {
      const progress = await getUserProgressByCourse(course.id);
      return {
        ...course,
        progress,
      };
    })
  );

  return (
    <>
      <div className="flex items-center gap-1 mb-4">
        <div className="p-2 rounded-full bg-emerald-500 text-white">
          <Award className="h-4 w-4" />
        </div>
        <h2 className="text-base font-semibold text-slate-800">Certificados</h2>
      </div>
      <ListCertificate courses={coursesWithProgress} name={name} />
    </>
  );
}
