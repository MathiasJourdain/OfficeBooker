# Supabase : RLS (Row Level Security) et l’erreur “violates row-level security”

## Symptôme
En ajoutant une salle :
- `new row violates row-level security policy for table "rooms"`

## Cause (simple)
RLS est activé sur `rooms` mais **aucune policy INSERT** n’autorise l’écriture.
Donc même si l’utilisateur est connecté, Postgres bloque l’insert.

## Fix côté Supabase (SQL Editor)

### Table `rooms` (exemple simple)
```sql
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;

CREATE POLICY "rooms_select_public"
ON rooms FOR SELECT
USING (true);

CREATE POLICY "rooms_insert_authenticated"
ON rooms FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);
```

## À savoir
- Le code Next.js peut être parfait : **si RLS bloque, ça échoue quand même**.
- RLS = sécurité au niveau DB (c’est normal et attendu en Supabase).

