export const PresencialesSkeleton = () => {
  return (
    <div className="animate-pulse px-4 py-6 space-y-6">
      <div className="flex justify-between items-center border rounded-lg bg-white px-4 py-4">
        <div className="h-6 w-32 bg-gray-300 rounded" /> 
        <div className="h-10 w-40 bg-gray-300 rounded" /> 
      </div>

      <div className="h-6 w-40 bg-gray-300 rounded" />

      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex justify-between items-center px-4 py-3 bg-gray-200 rounded"
          >
            <div className="h-4 w-1/4 bg-gray-300 rounded" />
            <div className="h-4 w-1/4 bg-gray-300 rounded" />
            <div className="h-4 w-1/4 bg-gray-300 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};
