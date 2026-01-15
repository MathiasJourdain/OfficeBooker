# TanStack Query : ce qu’on utilise et pourquoi

## Deux familles

### 1) Queries (lecture)
- **Hook**: `useSuspenseQuery`
- **But**: gérer automatiquement **cache**, **refetch**, et l’état de chargement via **Suspense**.
- **Exemples**:
  - `app/_hooks/queries/useRoomsSuspenseQuery.ts`
  - `app/rooms/_hooks/queries/useRoomSuspenseQuery.ts`
  - `app/my-bookings/_hooks/queries/useBookingsSuspenseQuery.ts`

### 2) Mutations (écriture)
- **Hook**: `useMutation`
- **But**: envoyer des actions (POST/DELETE/PUT), et ensuite **mettre à jour le cache**.
- **Exemple**:
  - `app/rooms/add/_hooks/mutations/usePostRoomMutation.ts`

## “Pourquoi un dossier `_hooks/mutations` ?”
Parce que c’est la convention du cours :
- queries = lecture (GET)
- mutations = écriture (POST/PUT/DELETE)

## Cache : les 2 actions classiques après une mutation
- **`invalidateQueries({ queryKey: [...] })`** : refetch pour être sûr d’avoir la vérité serveur
- (optionnel) **`setQueryData`** : mise à jour optimiste (vu dans le cours)

