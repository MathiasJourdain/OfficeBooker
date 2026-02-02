import { Skeleton } from "@/components/ui/skeleton"

export function BookingsListFallback() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col sm:flex-row gap-4 p-6 bg-white rounded-xl border border-gray-100"
        >
          <Skeleton className="h-32 sm:w-48 w-full" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      ))}
    </div>
  )
}
