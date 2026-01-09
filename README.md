This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


#########################################################
  
# Projet Office Booker – Avancé

**Date : 09/01**

## Description

Ce projet **Office Booker** met en œuvre des techniques avancées de requêtage et d’optimisation côté client à l’aide de **TanStack Query**, avec un backend de type **Supabase**.

L’objectif est de démontrer une approche performante, scalable et orientée UX pour la recherche et le filtrage de salles.

---

## Pourquoi ce projet est considéré comme *Avancé* ?

Ces points peuvent être utilisés comme **arguments pour un oral ou un écrit**.

### 1. Query Keys dynamiques

```ts
['rooms', debouncedSearch, capacity]
```

* Les requêtes ne se contentent pas de récupérer « toutes les salles ».
* Chaque combinaison de filtres (recherche, capacité, etc.) possède sa propre clé.
* TanStack Query déclenche automatiquement un **refetch** dès qu’un paramètre change.

👉 Résultat : cache intelligent et données toujours cohérentes.

---

### 2. Debouncing des recherches

* Implémentation d’un **debounce** avec `setTimeout` dans un `useEffect`.
* Évite d’envoyer une requête API à chaque frappe clavier.

👉 Améliore les performances et réduit la charge serveur.

---

### 3. Placeholder Data (UX avancée)

```ts
placeholderData: (previousData) => previousData
```

* Les anciennes données restent affichées pendant le chargement des nouvelles.
* Supprime l’effet de *scintillement* (flash blanc) lors des recherches successives.

👉 Expérience utilisateur fluide et professionnelle.

---

### 4. Filtrage côté serveur (Server-Side Filtering)

* Le filtrage est effectué directement via **Supabase**, déclenché par le client.
* Contrairement au filtrage JS côté client, cette approche reste performante même avec **des milliers de salles**.

👉 Solution scalable et adaptée à un contexte professionnel.

---

## Conclusion

Ce projet illustre une **maîtrise avancée de TanStack Query**, des bonnes pratiques de performance front-end et une réflexion orientée **UX et scalabilité**, justifiant pleinement son positionnement comme projet *avancé*.
