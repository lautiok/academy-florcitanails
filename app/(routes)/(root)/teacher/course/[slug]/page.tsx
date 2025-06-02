import { CourseForm, CourseHeader, CourseImage, CoursePrice } from "./components";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ChaptersBlock from "./components/chaptersBlock";

export default async function CoursePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params; 

  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return <div>No tienes sesión</div>;
  }

  const course = await prisma.course.findUnique({
    where: {
      slug: slug,
      userId: session.user.id,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      }
    },
  });

  if (!course) {
    return <div>No hay curso con ese slug</div>;
  }

  return (
    <div className="m-6">
      <CourseHeader slug={slug} isPublished={course.isPublished} />
      <CourseForm course={course} />
      <div className="grid grid-cols-1 md:grid-cols-2 my-4 gap-4">
        <CourseImage slug={slug} imageUrl={course.imageUrl} />

        <CoursePrice slug={slug} price={course.price} />
      </div>

      <ChaptersBlock slug={slug} chapters={course.chapters} />
    </div>
  );
}