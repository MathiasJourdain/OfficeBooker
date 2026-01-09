# 📖 Guide d'Explication - RoomForm.tsx

## 🎯 Pourquoi ce composant ?

C'est le **meilleur composant** à présenter au prof car il démontre :

- ✅ Hook custom (`useRoomForm`)
- ✅ Mutation TanStack Query (`usePostRoomMutation`)
- ✅ Validation Zod
- ✅ Gestion erreur + chargement
- ✅ "use client" petit et en bas de l'arborescence
- ✅ Flux de données complet

---

## 🔄 FLUX DE DONNÉES COMPLET

Voici le parcours des données **du formulaire jusqu'à la base de données** :

```
┌─────────────────────────────────────────────────────────────────┐
│  1. UTILISATEUR REMPLIT LE FORMULAIRE                           │
│     Input : name, capacity, equipment, image_url                │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  2. SOUMISSION DU FORMULAIRE                                    │
│     onSubmit={handleSubmit(onSubmit)}  (ligne 44)              │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  3. VALIDATION ZOD (dans useRoomForm)                           │
│     ✓ name : string non vide                                    │
│     ✓ capacity : nombre > 0                                     │
│     ✓ image_url : URL valide                                    │
│     Si erreur → affichage message (lignes 54-56, 69-71, etc.)  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  4. FONCTION onSubmit (lignes 17-36)                            │
│     - Transforme equipment en tableau                           │
│     - Prépare le payload                                        │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  5. MUTATION TANSTACK QUERY (ligne 23)                          │
│     postRoom(payload, { onSuccess })                            │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  6. REQUÊTE HTTP (dans usePostRoomMutation)                     │
│     POST /api/rooms                                             │
│     Body: { name, capacity, equipment, image_url }              │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  7. API ROUTE (app/api/rooms/route.ts)                          │
│     - Vérifie authentification                                  │
│     - Insère dans Supabase                                      │
│     - Retourne la salle créée                                   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  8. BASE DE DONNÉES SUPABASE                                    │
│     INSERT INTO rooms (name, capacity, equipment, image_url)    │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  9. RETOUR DE LA MUTATION                                       │
│     onSuccess: queryClient.invalidateQueries(["rooms"])         │
│     → Force le refetch de la liste des salles                   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│  10. REDIRECTION (ligne 32)                                     │
│      router.push("/?bookingSuccess=true")                       │
│      → Retour à l'accueil avec message de succès               │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📝 EXPLICATION LIGNE PAR LIGNE

### **Ligne 1 : `"use client"`**

**Question prof :** Pourquoi "use client" ?  
**Réponse :** Parce qu'on utilise des hooks React (`useRoomForm`, `usePostRoomMutation`, `useRouter`) qui nécessitent l'interactivité côté client. Mais le composant est **petit** et **en bas de l'arborescence** comme demandé.

---

### **Lignes 5-6 : Imports des hooks custom**

```tsx
import { useRoomForm, RoomFormFields } from "../_hooks/useRoomForm";
import { usePostRoomMutation } from "../_hooks/mutations/usePostRoomMutation";
```

**Question prof :** Qu'est-ce que ces hooks ?  
**Réponse :**

- `useRoomForm` : Hook custom qui encapsule `useForm` + validation Zod
- `usePostRoomMutation` : Hook custom qui encapsule `useMutation` pour créer une salle

**Pourquoi des hooks custom ?**

- Réutilisabilité
- Séparation des responsabilités
- Logique isolée et testable

---

### **Ligne 14 : Utilisation de useRoomForm**

```tsx
const {
  register,
  handleSubmit,
  formState: { errors },
} = useRoomForm();
```

**Question prof :** Qu'est-ce que `register` et `handleSubmit` ?  
**Réponse :**

- `register` : Fonction de `react-hook-form` qui connecte un input au formulaire
- `handleSubmit` : Fonction qui gère la soumission et déclenche la validation
- `errors` : Objet contenant les erreurs de validation Zod

**Voir ligne 52 :**

```tsx
{...register("name")}
```

Ça connecte l'input "name" au formulaire et active la validation Zod.

---

### **Ligne 15 : Utilisation de usePostRoomMutation**

```tsx
const { mutate: postRoom, isPending, isError, error } = usePostRoomMutation();
```

**Question prof :** À quoi servent ces variables ?  
**Réponse :**

- `postRoom` (mutate renommé) : Fonction pour déclencher la mutation
- `isPending` : `true` pendant la requête HTTP → désactive le bouton (ligne 117)
- `isError` : `true` si erreur → affiche message d'erreur (ligne 108)
- `error` : Objet erreur avec le message (ligne 110)

---

### **Lignes 17-36 : Fonction onSubmit**

```tsx
const onSubmit: SubmitHandler<RoomFormFields> = (data) => {
```

**Question prof :** Que se passe-t-il quand on soumet le formulaire ?  
**Réponse :**

**Étape 1 (lignes 19-21) :** Transformation des données

```tsx
const equipment = data.equipment
  ? data.equipment.split(",").map((item) => item.trim())
  : [];
```

On transforme `"Projecteur, Wifi"` → `["Projecteur", "Wifi"]`

**Étape 2 (lignes 23-35) :** Appel de la mutation

```tsx
postRoom(
  { name, capacity, equipment, image_url }, // Payload
  { onSuccess: () => router.push("/") } // Callback après succès
);
```

---

### **Ligne 44 : Connexion du formulaire**

```tsx
<form onSubmit={handleSubmit(onSubmit)}>
```

**Question prof :** Que fait `handleSubmit` ?  
**Réponse :**

1. Intercepte la soumission du formulaire
2. Valide les données avec Zod
3. Si ✅ validation OK → appelle `onSubmit(data)`
4. Si ❌ validation KO → affiche les erreurs (`errors.name`, etc.)

---

### **Lignes 52, 67, 83, 100 : Enregistrement des champs**

```tsx
{...register("name")}
```

**Question prof :** Qu'est-ce que le spread `{...register}` ?  
**Réponse :**
C'est un **spread operator** qui ajoute automatiquement :

- `name="name"` : Nom du champ
- `onChange={...}` : Gestionnaire de changement
- `onBlur={...}` : Validation au blur
- `ref={...}` : Référence pour react-hook-form

---

### **Lignes 54-56, 69-71 : Affichage des erreurs**

```tsx
{
  errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>;
}
```

**Question prof :** D'où viennent ces erreurs ?  
**Réponse :**
Du **schéma Zod** dans `useRoomForm.ts` :

```tsx
name: z.string().min(1, "Veuillez fournir un nom de salle");
```

Si l'utilisateur laisse vide → `errors.name.message = "Veuillez fournir..."`

---

### **Lignes 108-112 : Erreur globale**

```tsx
{
  isError && (
    <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
      {error?.message || "Une erreur est survenue"}
    </div>
  );
}
```

**Question prof :** Différence entre `errors` (ligne 54) et `isError` (ligne 108) ?  
**Réponse :**

- `errors` : Erreurs de **validation côté client** (Zod)
- `isError` : Erreur de **requête HTTP côté serveur** (TanStack Query)

---

### **Lignes 115-121 : Bouton de soumission**

```tsx
<Button
  type="submit"
  disabled={isPending}
  className="w-full bg-blue-600 hover:bg-blue-700"
>
  {isPending ? "Création en cours..." : "Créer la salle"}
</Button>
```

**Question prof :** Pourquoi `disabled={isPending}` ?  
**Réponse :**

- Pendant la requête HTTP, `isPending = true`
- Le bouton est désactivé pour éviter les doubles soumissions
- Le texte change pour indiquer le chargement

---

## 🔗 LIENS ENTRE LES FICHIERS

```
RoomForm.tsx (composant)
    ↓ utilise
useRoomForm.ts (hook custom de validation)
    ↓ contient
Schéma Zod (validation)

RoomForm.tsx (composant)
    ↓ utilise
usePostRoomMutation.ts (hook custom de mutation)
    ↓ appelle
POST /api/rooms (API route)
    ↓ insère dans
Supabase (base de données)
    ↓ succès
invalidateQueries(["rooms"]) (rafraîchit le cache)
```

---

## 🎯 POINTS CLÉS À RETENIR POUR LE PROF

1. **"use client" justifié** : Hooks React nécessaires, composant petit
2. **Hooks custom** : Séparation logique/présentation
3. **Validation Zod** : Côté client avant envoi
4. **TanStack Query** : Gestion async (loading, error, cache)
5. **Responsabilité claire** : Chaque fichier a un rôle précis
6. **Structure du cours** : `_hooks/mutations/` comme dans l'exemple fruits

---

## 💬 PHRASES À DIRE AU PROF

### Si le prof demande : "Explique-moi ce composant"

**Votre réponse :**

> "C'est le formulaire d'ajout de salle. Il utilise deux hooks custom :
>
> - `useRoomForm` qui gère la validation avec Zod
> - `usePostRoomMutation` qui gère l'envoi à l'API avec TanStack Query
>
> Quand l'utilisateur soumet, react-hook-form valide avec Zod. Si c'est bon, la mutation envoie un POST vers `/api/rooms`, qui insère dans Supabase. En cas de succès, TanStack Query invalide le cache des salles pour refetch automatiquement, puis on redirige vers l'accueil.
>
> Le composant est 'use client' parce qu'il utilise des hooks, mais il est petit et en bas de l'arborescence comme demandé dans le cours."

---

### Si le prof demande : "Pourquoi des hooks custom ?"

**Votre réponse :**

> "Pour séparer la logique métier de la présentation. `useRoomForm` encapsule toute la logique de validation, et `usePostRoomMutation` encapsule la logique d'appel API. Ça rend le code réutilisable et testable. C'est la même structure que dans votre exemple avec les fruits."

---

### Si le prof demande : "Comment gères-tu les erreurs ?"

**Votre réponse :**

> "Il y a deux types d'erreurs :
>
> 1. **Erreurs de validation** (côté client) : Gérées par Zod via react-hook-form, affichées sous chaque champ
> 2. **Erreurs HTTP** (côté serveur) : Gérées par TanStack Query avec `isError` et `error`, affichées en haut du formulaire"

---

### Si le prof demande : "Quel est le flux de données ?"

**Votre réponse :**

> "L'utilisateur remplit le formulaire → soumission → validation Zod → si OK, mutation TanStack Query → POST /api/rooms → API route vérifie l'auth et insère dans Supabase → en cas de succès, invalidation du cache TanStack Query → redirection vers l'accueil. Tout ça avec gestion du loading et des erreurs."

---

## ✅ CHECKLIST AVANT L'ÉVAL

- [ ] Je sais expliquer "use client"
- [ ] Je sais expliquer les hooks custom
- [ ] Je sais expliquer Zod et react-hook-form
- [ ] Je sais expliquer TanStack Query et useMutation
- [ ] Je sais expliquer le flux de données complet
- [ ] Je sais expliquer la différence entre erreurs validation / HTTP
- [ ] Je sais expliquer isPending et isError
- [ ] Je sais expliquer invalidateQueries

**Vous êtes prêt ! 🚀**
