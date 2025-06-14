import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Course, Chapter } from "@prisma/client";
import { redirect } from "next/navigation";

type CourseWithChaptersAndDocs = Course & {
  chapters: (Chapter & {
    documentUrl: {
      id: string;
      title: string;
      documentUrl: string;
      chapterId: string;
      createdAt: Date;
      updatedAt: Date;
    }[];
  })[];
};

export const getHomeCourses = async (): Promise<
  (Course & { chapters: Chapter[] })[] | null
> => {
  
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  try {
    const courses = await prisma.course.findMany({
      where: {
        isPublished: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 4,
      include: {
        chapters: {
          where: {
            isPublished: true,
          },
        },
      },
    });

    return courses;
  } catch (error) {
    console.error("Error al obtener cursos de inicio:", error);
    return null;
  }
};

export const getCourses = async (): Promise<
  (Course & { chapters: Chapter[] })[] | null
> => {
  
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  try {
    
    const courses = await prisma.course.findMany({
      where: {
        isPublished: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        chapters: {
          where: {
            isPublished: true,
          },
        },
      },
    });

    return courses;
  } catch (error) {
    console.error("Error al obtener cursos de inicio:", error);
    return null;
  }
};

export const getCourse = async (
  slug: string
): Promise<CourseWithChaptersAndDocs | null> => {
  
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  try {
    const course = await prisma.course.findUnique({
      where: {
        slug: slug,
      },
      include: {
        chapters: {
          where: {
            isPublished: true,
          },
          include: {
            documentUrl: true,
          },
          orderBy: {
            position: "asc",
          },
        },
      },
    });
    return course;
  } catch (error) {
    console.error("Error al obtener cursos de inicio:", error);
    return null;
  }
};

export const getSerchCourses = async (
  query: string
): Promise<(Course & { chapters: Chapter[] })[] | null> => {
  
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  try {
    const courses = await prisma.course.findMany({
      where: {
        title: {
          contains: query,
          mode: "insensitive",
        },
      },
      include: {
        chapters: true,
      },
    });
    return courses;
  } catch (error) {
    console.error("Error al obtener cursos de inicio:", error);
    return null;
  }
};
