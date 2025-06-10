import { Course } from "@prisma/client";
import { ChartNoAxesColumn, DollarSign } from "lucide-react";
import { Actions } from "./actions";

export const CardCourse = ({ course }: { course: Course }) => {
  const {
    title,
    description,
    price,
    level,
    category,
    imageUrl,
    isPublished,
    slug,
  } = course;

  return (
    <div className="relative border-b-2 border-gray-200 p-4">
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col lg:flex-row gap-4 items-start">
          <img
            src={imageUrl || "/florcitanailss.png"}
            alt={title}
            width={100}
            height={100}
            className="rounded-md max-w-52"
          />
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-medium">{title}</h2>
              {isPublished ? (
                <p className="inline-block bg-emerald-100 text-emerald-600 text-xs font-medium px-2 py-1 rounded-md">
                  Publicado
                </p>
              ) : (
                <p className="inline-block bg-red-50 text-red-400 text-xs font-medium px-2 py-1 rounded-md">
                  Sin publicar
                </p>
              )}
            </div>

            {description && (
              <p className="text-sm text-gray-400 max-w-lg line-clamp-1">
                {description}
              </p>
            )}

            <div className="flex gap-1 items-center text-sm mt-2">
              <DollarSign className="h-4 w-4 text-gray-400" />
              <p className="text-gray-400">Precio:</p>
              <p className="text-gray-500 font-semibold">{price || "0"}</p>
            </div>

            <div className="flex gap-1 items-center text-sm mt-2">
                <ChartNoAxesColumn className="h-4 w-4 text-gray-400" />
                <p className="text-gray-400">Nivel:</p>
                <p className="text-gray-500 font-semibold">{level || "principiante"}</p>
            </div>

          </div>
        </div>
        <Actions slug={slug} />
      </div>
    </div>
  );
};
