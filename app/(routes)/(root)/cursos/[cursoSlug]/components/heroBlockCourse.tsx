"use client";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils/formatPrice";
import { Chapter, Course } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const HeroBlockCourse = ({
  course,
  PurchasedCourse,
}: {
  course: Course & { chapters: Chapter[] };
  PurchasedCourse: boolean;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRollCourse = async () => {
    setIsLoading(true);
    if (course.price === "gratis") {
      try {
        await axios.post(`/api/courses/${course.slug}/enroll`, {
          withCredentials: true,
        });

        toast("Curso inscrito exitosamente 🎉");
        router.push(`/cursos/${course.slug}/${course.chapters[0].id}`);
      } catch (error) {
        toast.error("Error al inscribir al curso");
        console.error("Error al inscribir al curso:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        const response = await axios.post(`/api/courses/${course.slug}/checkout`, {
        withCredentials: true,
      });
      
        window.location.assign(response.data);
      } catch (error) {
        toast.error("Error al inscribir al curso");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8  p-2 rounded-xl bg-white  dark:bg-slate-900">
      <div className="flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
          {course.title}
        </h2>
        <p className="text-slate-600 dark:text-slate-300 mt-3 text-pretty">
          {course.description}
        </p>

        <h3 className="text-2xl font-semibold text-primary my-5">
          {formatPrice(course.price)}
        </h3>

        {PurchasedCourse ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              router.push(`/cursos/${course.slug}/${course.chapters[0].id}`)
            }
          >
            {" "}
            Ver curso
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            disabled={isLoading}
            onClick={handleRollCourse}
          >
            Inscribite ahora
          </Button>
        )}
      </div>

      <div className="flex justify-center items-center">
        <img
          src={course.imageUrl || "/florcitanailss.png"}
          alt={course.title}
          width={500}
          height={400}
          className="rounded-xl object-cover shadow-md max-h-[400px] w-full"
        />
      </div>
    </div>
  );
};
