# 📋 Architecture et Documentation du Projet OfficeBooker

## 🎯 Vue d'ensemble

**OfficeBooker** est une application web de réservation de salles de réunion construite avec **Next.js 16** (App Router), **TypeScript**, **Supabase** (base de données + authentification), et **Tailwind CSS**.

---

## 🏗️ Architecture Technique

### Stack Technologique

#### **Frontend**
- **Next.js 16.1.1** (App Router) - Framework React avec Server Components
- **React 19.2.3** - Bibliothèque UI
- **TypeScript 5.9.3** - Typage statique
- **Tailwind CSS 3.4.17** - Styling utilitaire
- **Radix UI** - Composants UI accessibles (Tabs, Label, Slot)
- **Lucide React** - Icônes
- **TanStack Query 5.90.16** - Gestion du cache et des requêtes côté client

#### **Backend & Base de données**
- **Supabase** - Backend as a Service
  - Base de données PostgreSQL
  - Authentification (email/password)
  - Row Level Security (RLS) pour la sécurité
- **Next.js Server Actions** - Actions serveur pour les mutations

#### **Outils de développement**
- **ESLint** - Linter
- **PostCSS** - Traitement CSS
- **Autoprefixer** - Préfixes CSS automatiques

---

## 📁 Structure du Projet

```
OfficeBooker/
├── app/                          # App Router de Next.js
│   ├── api/                      # Routes API
│   │   └── feed/                 # API pour le fil d'actualité
│   │       └── route.ts          # GET /api/feed (mock data)
│   ├── login/                    # Page de connexion/inscription
│   │   ├── page.tsx              # Page principale avec tabs
│   │   └── actions.ts            # Server Actions: login, signup, signOut
│   ├── my-bookings/              # Page des réservations utilisateur
│   │   ├── page.tsx              # Affichage des réservations
│   │   └── actions.ts            # Server Action: cancelBooking
│   ├── rooms/                    # Pages des salles
│   │   └── [id]/                 # Route dynamique par ID
│   │       ├── page.tsx          # Page de détail d'une salle
│   │       └── actions.ts        # Server Action: bookRoom
│   ├── layout.tsx               # Layout racine (Header + QueryProvider)
│   ├── page.tsx                  # Page d'accueil (liste des salles)
│   └── globals.css               # Styles globaux
│
├── components/                    # Composants React réutilisables
│   ├── bookings/                 # Composants de réservation
│   │   ├── BookingCard.tsx      # Carte d'une réservation
│   │   └── EmptyState.tsx       # État vide (pas de réservations)
│   ├── header/                   # Composants du header
│   │   ├── auth-controls.tsx    # Boutons connexion/déconnexion
│   │   └── logo.tsx              # Logo de l'application
│   ├── home/                     # Composants de la page d'accueil
│   │   ├── HomeHeader.tsx        # En-tête avec compteur et bouton "Ajouter"
│   │   ├── NewsFeed.tsx          # Fil d'actualité (client component avec TanStack Query)
│   │   ├── RoomCard.tsx          # Carte d'une salle
│   │   ├── RoomsGrid.tsx         # Grille des salles
│   │   ├── SuccessPopup.tsx     # Popup de succès
│   │   └── ErrorPopup.tsx        # Popup d'erreur
│   ├── login/                    # Composants de login
│   │   ├── LoginForm.tsx         # Formulaire de connexion
│   │   ├── SignupForm.tsx        # Formulaire d'inscription
│   │   └── AlertMessage.tsx      # Message d'alerte
│   ├── rooms/                    # Composants des salles
│   │   ├── BookingForm.tsx      # Formulaire de réservation
│   │   └── RoomImage.tsx         # Image d'une salle
│   ├── ui/                       # Composants UI de base (shadcn/ui)
│   │   ├── alert.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── skeleton.tsx
│   │   └── tabs.tsx
│   ├── header.tsx                # Header principal (Server Component)
│   └── submit-button.tsx         # Bouton de soumission avec état pending
│
├── providers/                    # Providers React
│   └── QueryProvider.tsx         # Provider TanStack Query
│
├── utils/                        # Utilitaires
│   ├── supabase/
│   │   ├── client.ts             # Client Supabase côté navigateur
│   │   └── server.ts             # Client Supabase côté serveur (avec cookies)
│   └── utils.ts                  # Fonctions utilitaires (cn, etc.)
│
├── public/                       # Fichiers statiques
├── package.json                  # Dépendances et scripts
├── tsconfig.json                 # Configuration TypeScript
├── tailwind.config.ts           # Configuration Tailwind
└── next.config.ts               # Configuration Next.js
```

---

## 🔑 Fonctionnalités Implémentées

### 1. **Authentification** (`/login`)
- ✅ **Connexion** : Email + mot de passe via Supabase Auth
- ✅ **Inscription** : Création de compte avec nom complet
- ✅ **Déconnexion** : Action serveur pour se déconnecter
- ✅ **Gestion de session** : Cookies gérés automatiquement par Supabase SSR

**Fichiers clés :**
- `app/login/page.tsx` - Interface avec tabs (Connexion/Inscription)
- `app/login/actions.ts` - Server Actions: `login()`, `signup()`, `signOut()`

**Comment ça marche :**
1. L'utilisateur remplit le formulaire
2. Le formulaire appelle une Server Action (`login` ou `signup`)
3. L'action utilise `createClient()` de `utils/supabase/server.ts`
4. Supabase gère l'authentification et stocke la session dans les cookies
5. Redirection vers la page d'accueil

---

### 2. **Page d'Accueil** (`/`)
- ✅ **Affichage des salles** : Liste de toutes les salles disponibles
- ✅ **Fil d'actualité** : Composant client avec TanStack Query qui fetch `/api/feed`
- ✅ **Notifications** : Popups de succès/erreur via query params
- ✅ **Compteur de salles** : Affiche le nombre total de salles

**Fichiers clés :**
- `app/page.tsx` - Page principale (Server Component)
- `components/home/RoomsGrid.tsx` - Grille responsive des salles
- `components/home/RoomCard.tsx` - Carte individuelle d'une salle
- `components/home/NewsFeed.tsx` - Fil d'actualité (Client Component avec TanStack Query)
- `app/api/feed/route.ts` - API route qui retourne des données mockées

**Comment ça marche :**
1. La page d'accueil est un **Server Component** qui fetch les salles depuis Supabase
2. Les données sont passées aux composants enfants
3. Le `NewsFeed` est un **Client Component** qui utilise TanStack Query pour fetch `/api/feed`
4. Les popups de notification sont affichées selon les query params (`?bookingSuccess=true` ou `?error=...`)

---

### 3. **Détail d'une Salle** (`/rooms/[id]`)
- ✅ **Affichage des détails** : Image, nom, capacité, équipements
- ✅ **Formulaire de réservation** : Date de début et fin
- ✅ **Validation** : Vérification que la date de fin est après la date de début

**Fichiers clés :**
- `app/rooms/[id]/page.tsx` - Page de détail (Server Component)
- `components/rooms/BookingForm.tsx` - Formulaire de réservation
- `components/rooms/RoomImage.tsx` - Affichage de l'image
- `app/rooms/[id]/actions.ts` - Server Action `bookRoom()`

**Comment ça marche :**
1. La page récupère la salle depuis Supabase avec l'ID de l'URL
2. Le formulaire appelle la Server Action `bookRoom()` au submit
3. L'action vérifie l'authentification, valide les dates, et insère dans la table `bookings`
4. Gestion des erreurs (doublons, etc.) avec redirection vers la page d'accueil avec message d'erreur
5. En cas de succès, redirection vers `/?bookingSuccess=true`

---

### 4. **Mes Réservations** (`/my-bookings`)
- ✅ **Liste des réservations** : Toutes les réservations de l'utilisateur connecté
- ✅ **Annulation** : Possibilité d'annuler une réservation
- ✅ **Affichage détaillé** : Date, heure, nom de la salle, image

**Fichiers clés :**
- `app/my-bookings/page.tsx` - Page des réservations (Server Component)
- `components/bookings/BookingCard.tsx` - Carte d'une réservation
- `components/bookings/EmptyState.tsx` - État vide
- `app/my-bookings/actions.ts` - Server Action `cancelBooking()`

**Comment ça marche :**
1. La page récupère les réservations de l'utilisateur connecté avec une jointure sur `rooms`
2. Chaque réservation est affichée dans une `BookingCard`
3. Le bouton "Annuler" appelle la Server Action `cancelBooking()`
4. L'action supprime la réservation (avec vérification RLS côté Supabase)
5. La page est revalidée pour mettre à jour l'affichage

---

### 5. **Header Global**
- ✅ **Logo** : Lien vers la page d'accueil
- ✅ **Contrôles d'authentification** : 
  - Si non connecté : Bouton "Connexion"
  - Si connecté : Nom d'utilisateur, bouton "Mes Réservations", bouton déconnexion

**Fichiers clés :**
- `components/header.tsx` - Header principal (Server Component)
- `components/header/auth-controls.tsx` - Boutons d'authentification
- `components/header/logo.tsx` - Logo

**Comment ça marche :**
1. Le header est un Server Component qui récupère l'utilisateur via `supabase.auth.getUser()`
2. Il passe les informations à `AuthControls` qui affiche les boutons appropriés
3. Le header est sticky (reste en haut lors du scroll)

---

## 🗄️ Structure de la Base de Données (Supabase)

### Tables Impliquées

#### 1. **`rooms`** (Salles)
```sql
- id (uuid, primary key)
- name (text) - Nom de la salle
- capacity (integer) - Capacité
- equipment (text[]) - Tableau d'équipements
- image_url (text, nullable) - URL de l'image
- created_at (timestamp)
```

#### 2. **`bookings`** (Réservations)
```sql
- id (uuid, primary key)
- room_id (uuid, foreign key -> rooms.id)
- user_id (uuid, foreign key -> auth.users.id)
- start_time (timestamp)
- end_time (timestamp)
- created_at (timestamp)
```

**Contrainte importante :**
- Contrainte d'exclusion PostgreSQL pour éviter les chevauchements de réservations sur la même salle
- Code d'erreur `23P01` si violation (détecté dans `bookRoom()`)

#### 3. **`profiles`** (Profils utilisateurs)
Probablement créé via un trigger SQL lors de l'inscription pour stocker `full_name` depuis `user_metadata`.

---

## 🔐 Sécurité (Row Level Security - RLS)

Supabase utilise **RLS** pour sécuriser les données :

- **`bookings`** : Les utilisateurs ne peuvent voir/modifier que leurs propres réservations
- **`rooms`** : Probablement accessible en lecture pour tous, écriture restreinte
- **Authentification** : Gérée par Supabase Auth avec sessions dans les cookies

---

## 🔄 Flux de Données

### Server Components vs Client Components

#### **Server Components** (par défaut)
- S'exécutent sur le serveur
- Accès direct à la base de données
- Pas de JavaScript côté client
- Exemples : `app/page.tsx`, `app/rooms/[id]/page.tsx`, `components/header.tsx`

#### **Client Components** (`"use client"`)
- S'exécutent dans le navigateur
- Interactivité, hooks React, état local
- Exemples : `components/home/NewsFeed.tsx`, `components/submit-button.tsx`

### Server Actions
- Fonctions marquées `'use server'`
- S'exécutent sur le serveur mais peuvent être appelées depuis le client
- Utilisées pour les mutations (login, signup, bookRoom, cancelBooking)
- Exemples : `app/login/actions.ts`, `app/rooms/[id]/actions.ts`

### TanStack Query
- Utilisé uniquement dans les Client Components
- Cache les données côté client
- Exemple : `components/home/NewsFeed.tsx` qui fetch `/api/feed`

---

## 🎨 Styling

- **Tailwind CSS** : Classes utilitaires pour le styling
- **shadcn/ui** : Composants UI pré-stylés (Button, Card, Input, etc.)
- **Responsive** : Design mobile-first avec breakpoints (`md:`, `lg:`)

---

## 🔧 Configuration Requise

### Variables d'Environnement

Créer un fichier `.env.local` à la racine du projet :

```env
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon_supabase
```

### Installation

```bash
npm install
```

### Développement

```bash
npm run dev
```

### Build Production

```bash
npm run build
npm start
```

---

## 📝 Points Importants à Comprendre

### 1. **Architecture Next.js App Router**
- Les fichiers dans `app/` définissent les routes
- `page.tsx` = page accessible
- `layout.tsx` = layout partagé
- `actions.ts` = Server Actions
- `route.ts` = API route

### 2. **Supabase SSR**
- Deux clients différents : `client.ts` (navigateur) et `server.ts` (serveur)
- Le client serveur gère les cookies pour la session
- Les Server Components utilisent `server.ts`
- Les Client Components utilisent `client.ts`

### 3. **Gestion des Erreurs**
- Les Server Actions redirigent avec des query params pour afficher les erreurs
- Exemple : `redirect('/?error=Message d'erreur')`
- Les popups lisent ces query params pour s'afficher

### 4. **Revalidation**
- `revalidatePath()` force Next.js à recharger les données
- Utilisé après les mutations pour mettre à jour l'affichage

### 5. **TanStack Query**
- Utilisé uniquement pour les données côté client (ex: `/api/feed`)
- Les données serveur sont fetchées directement dans les Server Components

---

## 🚀 Fonctionnalités Futures Possibles

- Page `/rooms/add` pour ajouter une salle (lien déjà présent dans `HomeHeader`)
- Planning visuel des réservations
- Recherche/filtrage des salles
- Notifications en temps réel
- Gestion des rôles (admin, utilisateur)

---

## 📚 Ressources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [TanStack Query Documentation](https://tanstack.com/query)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Dernière mise à jour :** Analyse complète du projet OfficeBooker

