import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export function RoomDetailsFallback() {
  return (
    <Card className="w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
      <div className="md:w-1/2">
        <Skeleton className="h-64 md:h-full w-full" />
      </div>
      <div className="md:w-1/2 p-6 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </Card>
  )
}

