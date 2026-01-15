# API Routes (Next.js) : où sont les endpoints ?

## Rooms
- **GET + POST**: `app/api/rooms/route.ts`
  - `GET /api/rooms?search=&minCapacity=` : liste filtrée
  - `POST /api/rooms` : création d’une salle (nécessite utilisateur connecté + RLS OK)

- **GET détail**: `app/api/rooms/[id]/route.ts`
  - `GET /api/rooms/:id`

## Bookings
- **GET + POST**: `app/api/bookings/route.ts`
  - `GET /api/bookings` : réservations de l’utilisateur connecté
  - `POST /api/bookings` : créer une réservation (gère dates + conflit 23P01)

## Ce que le prof peut demander
- **“Pourquoi passer par `/api/...` plutôt que Supabase direct côté client ?”**
  - Pour centraliser la logique serveur (auth, validations, erreurs) et garder l’app cohérente.

