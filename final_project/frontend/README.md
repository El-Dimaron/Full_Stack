# Bondini Shop

A small educational e-commerce project built with React + TypeScript.

The project implements a basic product catalog with the ability to create, edit, delete, search, and paginate products.

## Features

- Product catalog browsing
- Creating new products
- Editing products
- Deleting products
- Product search with debounce
- Product catalog pagination
- Light / Dark theme
- Data persistence using Local Storage
- Success notifications
- 404 page
- Responsive UI
- Unit tests

## Tech Stack

- React
- TypeScript
- Vite
- Redux Toolkit
- React Redux
- React Router
- SCSS
- Ant Design
- Vitest
- React Testing Library
- Local Storage

## Project Structure

```text
src/
├── app/
│ ├── hooks.ts
│ └── store.ts
│
├── assets/
│ └── images/
│
├── components/
│ ├── Header.tsx
│ └── Footer.tsx
│
├── features/
│ ├── items/
│ ├── theme/
│ └── contacts/
│
├── pages/
│ ├── Home.tsx
│ ├── Shop.tsx
│ ├── CreateItem.tsx
│ ├── UpdateItem.tsx
│ ├── Contacts.tsx
│ └── NotFound.tsx
│
└── router.tsx
```

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

## Testing

Run tests in watch mode:

```bash
npm run test
```

Run tests once:

```bash
npm run test:run
```

Run test coverage:

```bash
npm run coverage
```

## Data Storage

Products and selected theme are stored locally in the browser using `localStorage`.

Redux Toolkit is used as the main application state manager, while `localStorage` provides persistence between page reloads.

## Status

The project is created for educational purposes and is still under development.
