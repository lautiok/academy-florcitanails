export function ListCoursesSkeleton({ title }: { title: string }) {
  return (
    <div className="my-4 mx-6 border rounded-lg border-slate-200 p-4">
      <h2 className="text-2xl font-normal">{title}</h2>
      <div className="border-b-[1px] py-2" />
      <div className="grid grid-cols-1 lg:grid-col-3 xl:grid-cols-4 gap-3 mt-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="border rounded-lg border-slate-200 overflow-hidden bg-white">
            <div className="w-full h-40 bg-gray-200 animate-pulse" />
            <div className="p-4 space-y-2">
              <div className="h-6 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}