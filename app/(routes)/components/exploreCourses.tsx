"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const ExploreCourses = () => {
  const router = useRouter();


  return (
    <div>
      <div className="my-4 mx-6  border border-slate-200 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-4">
          <div className="flex flex-col gap-4 p-6">
            <h2 className="text-4xl font-semibold"> Explora nuestros cursos 🎉</h2>
            <p className="text-balance max-m-2xl">
               Descubrí nuestros cursos de belleza femenina, disponibles en modalidad presencial y virtual. 
              Aprendé maquillaje, uñas, skincare y más, de la mano de profesionales del rubro. 
              Elegí cómo y cuándo formarte, y llevá tu pasión al siguiente nivel.
            </p>
            <Button variant="outline" size="sm" onClick={() => router.push("/cursos")}>
              Ver todos los cursos
            </Button>
          </div>
          <div className="flex items-end">
            <img
              src="/hero.webp"
              alt="hero-image"
              width={300}
              height={200}
            />
          </div>
        </div>
      </div>
    </div>
  );
};