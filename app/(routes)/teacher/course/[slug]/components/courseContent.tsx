import { auth } from "@/lib/auth";
import ChaptersBlock from "./chaptersBlock";
import { CourseForm } from "./courseForm";
import { CourseImage } from "./courseImage";
import { CoursePrice } from "./coursePrice";
import { CourseHeader } from "./header";
import { getCourseBySlugUser } from "@/dal/Courses";

export async function CourseContent({
    slug,
}: {
    slug: string;
}) {
      const session = await auth();
    
      if (!session?.user.id) {
        return <div>No tienes sesión</div>;
      }
    
      const course = await getCourseBySlugUser(slug, session.user.id);
    
      if (!course) {
        return <div>No hay curso con ese slug</div>;
      }
  return (
    <>
      <CourseHeader slug={slug} isPublished={course.isPublished} />
      <CourseForm course={course} />
      <div className="grid grid-cols-1 md:grid-cols-2 my-4 gap-4">
        <CourseImage slug={slug} imageUrl={course.imageUrl} />
        <CoursePrice slug={slug} price={course.price} />
      </div>
      <ChaptersBlock slug={slug} chapters={course.chapters} />
    </>
  );
}
