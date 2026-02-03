import React from 'react'
import { render, screen, act, fireEvent } from '@testing-library/react'
import { vi, describe, beforeEach, afterEach, test, expect } from 'vitest'

const { mockRooms, mockUseTranslations } = vi.hoisted(() => {
  const rooms = [
    { id: 1, name: 'Salle Alpha', capacity: 4 },
    { id: 2, name: 'Salle Beta', capacity: 8 },
    { id: 3, name: 'Salle Gamma', capacity: 2 },
  ]

  const translations = () => (key: string, params?: { count?: number }) => {
    if (params?.count !== undefined) {
      return `${params.count} salle(s) correspondent à vos critères.`
    }
    
    if (key === 'noRoomsFound') return 'Aucune salle trouvée.'
    
    if (key === 'searchRoom') return 'Rechercher une salle'
    if (key === 'minCapacity') return 'Capacité Min.'
    if (key === 'searchPlaceholder') return 'Ex: Salle Jeff Bezos...'
    if (key === 'capacityPlaceholder') return 'Ex: 4'
    
    return key
  }

  return { mockRooms: rooms, mockUseTranslations: translations }
})

vi.mock('next-intl', () => ({ useTranslations: mockUseTranslations }))
vi.mock('@/providers/I18nProvider', () => ({ useTranslations: mockUseTranslations }))

vi.mock('@/utils/supabase/client', () => ({
  createClient: () => ({ from: () => ({ select: () => ({ order: () => ({ ilike: () => ({ gte: () => Promise.resolve({ data: [], error: null }) }) }) }) }) }),
}))

vi.mock('@tanstack/react-query', () => ({
  useQuery: ({ queryKey }: { queryKey: any[] }) => {
    let search = ''
    let capacity = 0
    if (typeof queryKey[1] === 'object' && queryKey[1] !== null) {
      search = queryKey[1].search || ''
      capacity = queryKey[1].capacity || 0
    } else {
      search = queryKey[1] || ''
      capacity = queryKey[2] || 0
    }
    const filtered = mockRooms
      .filter(r => r.name.toLowerCase().includes(String(search).toLowerCase()))
      .filter(r => r.capacity >= Number(capacity))
    return { data: filtered, isLoading: false, isError: false }
  },
}))

vi.mock('../components/home/RoomsGrid', () => ({ RoomsGrid: ({ rooms }: { rooms: any[] }) => <div data-testid="rooms-grid">{rooms?.length} rooms</div> }))
vi.mock('@/components/ui/input', () => ({ Input: (props: any) => <input {...props} /> }))
vi.mock('@/components/ui/label', () => ({ Label: (props: any) => <label {...props} /> }))
vi.mock('@/components/ui/skeleton', () => ({ Skeleton: () => <div data-testid="skeleton" /> }))

import { FilteredRoomList } from '../components/home/FilteredRoomList'

describe('FilteredRoomList', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    act(() => vi.runOnlyPendingTimers())
    vi.useRealTimers()
  })

  function renderFilteredList() {
    render(<FilteredRoomList />)
  }

  test('shows all rooms initially', () => {
    renderFilteredList()
    act(() => { vi.advanceTimersByTime(100) })
    expect(screen.getByText(/3 salle\(s\) correspondent/)).toBeInTheDocument()
  })

  test('filters by search text', () => {
    renderFilteredList()
    const input = screen.getByPlaceholderText('Ex: Salle Jeff Bezos...')
    fireEvent.change(input, { target: { value: 'Beta' } })
    act(() => { vi.advanceTimersByTime(500) })
    expect(screen.getByText(/1 salle\(s\) correspondent/)).toBeInTheDocument()
  })

  test('filters by capacity', () => {
    renderFilteredList()
    const capacityInput = screen.getByPlaceholderText('Ex: 4')
    fireEvent.change(capacityInput, { target: { value: '5' } })
    act(() => { vi.advanceTimersByTime(500) })
    expect(screen.getByText(/1 salle\(s\) correspondent/)).toBeInTheDocument()
  })

  test('shows no results message', () => {
    renderFilteredList()
    const input = screen.getByPlaceholderText('Ex: Salle Jeff Bezos...')
    
    fireEvent.change(input, { target: { value: 'Zzz' } })
    
    act(() => { vi.advanceTimersByTime(500) })

    expect(screen.getByText('Aucune salle trouvée.')).toBeInTheDocument()
  })
})