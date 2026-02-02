import React from 'react'
import { render, screen, act, fireEvent } from '@testing-library/react'
import { vi, describe, beforeEach, afterEach, test, expect } from 'vitest'

vi.mock('@/utils/supabase/client', () => ({
  createClient: () => ({
    from: () => ({
      select: () => ({
        order: () => ({
          ilike: () => ({
            gte: () => Promise.resolve({ data: [], error: null }),
          }),
        }),
      }),
    }),
  }),
}))

vi.mock('@tanstack/react-query', () => {
  const localMockRooms = [
    { id: 1, name: 'Salle Alpha', capacity: 4 },
    { id: 2, name: 'Salle Beta', capacity: 8 },
    { id: 3, name: 'Salle Gamma', capacity: 2 },
  ]

  return {
    useQuery: ({ queryKey }: { queryKey: any[] }) => {
      const [, search = '', capacity = 0] = queryKey
      const filtered = localMockRooms
        .filter((r) => r.name.toLowerCase().includes(String(search).toLowerCase()))
        .filter((r) => r.capacity >= Number(capacity || 0))
      return { data: filtered, isLoading: false, isError: false }
    },
  }
})

vi.mock('../components/home/RoomsGrid', () => ({
  RoomsGrid: ({ rooms }: { rooms: any[] }) => <div data-testid="rooms-grid">{rooms?.length} rooms</div>,
}))

vi.mock('@/components/ui/input', () => ({
  Input: (props: any) => <input {...props} />,
}))

vi.mock('@/components/ui/label', () => ({
  Label: (props: any) => <label {...props} />,
}))

vi.mock('@/components/ui/skeleton', () => ({
  Skeleton: (props: any) => <div data-testid="skeleton" {...props} />,
}))

import { FilteredRoomList } from '../components/home/FilteredRoomList'

describe('FilteredRoomList', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  test('shows all rooms initially', () => {
    render(<FilteredRoomList />)
    expect(screen.getByText(/3 salle\(s\) correspondent/)).toBeInTheDocument()
  })

  test('filters by search text', () => {
    render(<FilteredRoomList />)
    
    const input = screen.getByPlaceholderText('Ex: Salle Jeff Bezos...')
    fireEvent.change(input, { target: { value: 'Beta' } })
    
    act(() => {
      vi.advanceTimersByTime(500)
    })
    
    expect(screen.getByText(/1 salle\(s\) correspondent/)).toBeInTheDocument()
  })

  test('filters by capacity', () => {
    render(<FilteredRoomList />)
    
    const capacityInput = screen.getByPlaceholderText('Ex: 4')
    fireEvent.change(capacityInput, { target: { value: '5' } })
    
    act(() => {
      vi.advanceTimersByTime(500)
    })
    
    expect(screen.getByText(/1 salle\(s\) correspondent/)).toBeInTheDocument()
  })

  test('shows no results message', () => {
    render(<FilteredRoomList />)
    
    const input = screen.getByPlaceholderText('Ex: Salle Jeff Bezos...')
    fireEvent.change(input, { target: { value: 'Zzz' } })
    
    act(() => {
      vi.advanceTimersByTime(500)
    })
    
    expect(screen.getByText('Aucune salle trouvée.')).toBeInTheDocument()
  })
})