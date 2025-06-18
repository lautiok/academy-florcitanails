"use client"

export function PaymentsSkeleton() {
  return (
    <div className="mx-auto my-10 w-full border border-slate-200 rounded-lg p-4 animate-pulse space-y-4">
      <div className="h-6 w-1/4 bg-gray-300 rounded" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex justify-between items-center gap-2">
          <div className="h-4 w-1/4 bg-gray-200 rounded" />
          <div className="h-4 w-1/4 bg-gray-200 rounded" />
          <div className="h-4 w-1/4 bg-gray-200 rounded" />
        </div>
      ))}
    </div>
  );
}
