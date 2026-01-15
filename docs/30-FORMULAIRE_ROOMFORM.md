# Formulaire “Ajouter une salle” (react-hook-form + zod)

## Fichiers à connaître
- **UI**: `app/rooms/add/_components/RoomForm.tsx`
- **Hook form + Zod**: `app/rooms/add/_hooks/useRoomForm.ts`
- **Mutation**: `app/rooms/add/_hooks/mutations/usePostRoomMutation.ts`

## Validation (Zod)
Dans `useRoomForm.ts` :
- `name` : non vide
- `capacity` : nombre entier > 0 (avec `z.coerce` pour caster)
- `image_url` : URL valide ou vide

## Erreurs : 2 types
- **Erreurs de validation (client)** : `formState.errors.<field>`
- **Erreurs HTTP (serveur)** : `isError` + `error.message` côté mutation

## Chargement
Pendant l’appel POST :
- `isPending === true` → bouton désactivé + texte “Création en cours...”

