"use client"

import { useBookingsSuspenseQuery } from "../_hooks/queries/useBookingsSuspenseQuery"
import { BookingCard } from "@/components/bookings/BookingCard"
import { EmptyState } from "@/components/bookings/EmptyState"

export function BookingsList() {
  const { data: bookings } = useBookingsSuspenseQuery()

  if (!bookings || bookings.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking: any) => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  )
}

