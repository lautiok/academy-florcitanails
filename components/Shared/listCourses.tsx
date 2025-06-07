import { formatPrice } from "@/utils/formatPrice";
import { Chapter, Course } from "@prisma/client";
import Link from "next/link";

export const ListCourses = ({
  title,
  courses,
}: {
  title: string;
  courses: (Course & { chapters: Chapter[] })[] | null;
}) => {
  return (
    <div>
      <div className="my-4 mx-6 border rounded-lg border-slate-200 p-4">
        <h2 className="text-2xl font-normal">{title}</h2>
        <div className="border-b-[1px] py-2" />
        {courses && courses.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-col-3 xl:grid-cols-4 gap-3 mt-4">
            {courses.map(
              ({
                id,
                title,
                slug,
                category,
                imageUrl,
                price,
                level,
                description,
              }) => (
                <Link
                  key={id}
                  href={`/cursos/${slug}`}
                  className="border rounded-lg border-slate-200 relative transition-shadow hover:shadow-xl overflow-hidden bg-white"
                >
                  <img
                    src={imageUrl || "/placeholder.jpg"}
                    alt={title}
                    className="w-full h-40 object-cover"
                  />

                  <span className="absolute top-2 left-2 z-10 bg-slate-900 text-white text-xs px-2 py-1 rounded">
                    {category}
                  </span>

                  <div className="p-4 flex flex-col gap-1">
                    <h3 className="text-lg font-semibold text-slate-800 line-clamp-2">
                      {title}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-2">
                      {description}
                    </p>

                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span className="font-medium text-emerald-600">
                        {formatPrice(price)}
                      </span>
                      <span className="text-slate-400">{level}</span>
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-4 p-6">
            <p className="text-center text-gray-500">No hay cursos</p>
          </div>
        )}
      </div>
    </div>
  );
};
