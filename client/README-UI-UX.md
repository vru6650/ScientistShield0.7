# UI/UX Refactor Guide

This document outlines the design system and primitives introduced in the `feat/ui-ux-refactor` branch.

## Design Tokens
Tokens are defined as CSS variables in `src/styles/theme.css` and consumed via Tailwind using `hsl(var(--token))`.

- `--bg`, `--surface`, `--text`, `--muted`
- `--primary`, `--primary-fg`
- `--danger`
- `--ring`, `--border`
- radius: `--radius-sm`, `--radius-md`, `--radius-lg`
- shadows: `--shadow-sm`, `--shadow-md`

Dark mode values live on the `.dark` class.

## Global Styles
`src/styles/globals.css` registers Tailwind layers, body styles, focus rings, and a `.skip-to-content` utility.

## Components
All primitives live in `src/ui/`.

- `ThemeProvider` / `ThemeToggle` – manages light and dark themes with localStorage persistence.
- `Button` – variants: primary, secondary, ghost, danger; sizes: sm, md, lg, icon; supports a loading state.
- `InputField` – label, hint, error messaging with proper aria attributes.
- `Card`, `CardHeader`, `CardBody`, `CardFooter` – basic content containers.
- `Skeleton` – animated loading placeholder.
- `EmptyState` – friendly message for empty lists.
- `ToastProvider` / `useToast` – non‑blocking feedback via toasts.
- `AppShell` – sticky header, optional sidebar, skip link, and responsive layout.

## Usage Example
```jsx
import { Button } from './ui/Button';
import { Card, CardHeader, CardBody } from './ui/Card';

<Card>
  <CardHeader>My Card</CardHeader>
  <CardBody>
    <Button onClick={() => push('Clicked!')}>Action</Button>
  </CardBody>
</Card>
```

## Adding a New Page
Wrap new pages with `AppShell` inside `App.jsx` and compose primitives:
```jsx
<AppShell sidebar={<Sidebar />}>
  <Card>
    <CardHeader>Dashboard</CardHeader>
    <CardBody>
      <Button>Get Started</Button>
    </CardBody>
  </Card>
</AppShell>
```
