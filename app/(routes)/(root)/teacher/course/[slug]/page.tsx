import { CourseForm, CourseHeader, CourseImage, CoursePrice } from "./components";
import { prisma } from "@/lib/prisma";
import ChaptersBlock from "./components/chaptersBlock";
import { auth } from "@/lib/auth";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const session = await auth();

  if (!session?.user.id) {
    return <div>No tienes sesión</div>;
  }

  const course = await prisma.course.findUnique({
    where: {
      slug,
      userId: session.user.id,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
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
