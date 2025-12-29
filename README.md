# Finoplex Frontend

A modern, responsive React/Next.js frontend for the Finoplex application.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI**: Clean, minimal design with Tailwind CSS
- **Modular Components**: Reusable UI components and feature modules
- **Authentication**: Login/Register with form validation
- **Expense Management**: Add, view, edit, and delete expenses
- **Real-time Updates**: Automatic refresh after operations
- **Month/Year Filtering**: Filter expenses by time period

## Tech Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- Lucide React (icons)
- Class Variance Authority (component variants)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
frontend/
├── app/                    # Next.js app directory
├── components/
│   ├── ui/                # Base UI components
│   ├── auth/              # Authentication components
│   ├── expense/           # Expense management components
│   └── layout/            # Layout components
├── lib/                   # Utilities and contexts
└── public/               # Static assets
```

## Components

### UI Components
- `Button` - Reusable button with variants
- `Input` - Form input with error states
- `Card` - Content container

### Feature Components
- `AuthForm` - Login/Register form
- `ExpenseForm` - Add expense form
- `ExpenseList` - Display and manage expenses
- `Header` - Navigation header
- `Dashboard` - Main application view

## Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```