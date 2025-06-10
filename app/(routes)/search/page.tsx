import { getSerchCourses } from "@/actions/getCourses";
import { ListCourses } from "@/components/Shared";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;
  const courses = query ? await getSerchCourses(query) : null;

  return (
    <div className="p-6">
      <div className="mb-8">
        {!query && (
          <p className="text-gray-500">Ingresa un término de búsqueda</p>
        )}
        {query && !courses?.length && (
          <p className="text-gray-500">
            No se encontraron resultados para "{query}"
          </p>
        )}
      </div>

      {courses && courses.length > 0 && (
        <ListCourses courses={courses} title="Resultados de búsqueda" />
      )}
    </div>
  );
}