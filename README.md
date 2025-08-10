# Issue Tracker

A full-stack issue tracking dashboard with authentication, real-time summaries, and interactive visualizations. Authenticated users can create, update, and delete issues, while the dashboard provides quick insights into project health through charts and activity feeds.

## Features

- **Secure Google login** with NextAuth
- **Role-based permissions** to restrict updates/deletions to authenticated users
- **Dynamic metadata generation** optimized with React cache
- **Interactive charts** and recent activity feed for quick insights
- **Responsive UI** using Tailwind CSS and Radix UI

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS, Radix UI
- **Backend:** Next.js API routes, Prisma
- **Database:** MySQL
- **Authentication:** NextAuth with Google provider

## Technical Highlights

- **Google authentication with NextAuth** to secure issue updates/deletions
- **Prisma + MySQL ORM integration** for robust and type-safe database queries
- **React cache** for optimizing repeated queries and generating dynamic metadata
- **Server-rendered summaries** and chart visualizations for real-time data insights

## Getting Started

### Prerequisites

- Node.js (v18+)
- MySQL database

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/issue-tracker.git

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your database URL, Google OAuth keys, and NextAuth secret

# Run database migrations
npx prisma migrate dev

# Start the development server
npm run dev

# Start the prod build & server
npm run build
npm start
```

# Environment Variables

| Key                    | Description                    |
| ---------------------- | ------------------------------ |
| `DATABASE_URL`         | MySQL connection string        |
| `NEXTAUTH_URL`         | Base URL for NextAuth          |
| `NEXTAUTH_SECRET`      | Secret for NextAuth encryption |
| `GOOGLE_CLIENT_ID`     | Google OAuth Client ID         |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret     |
