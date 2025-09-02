# QA Engineer Tech Test - Book Library Application

## Overview

This is a technical test for QA Engineer applicants. The application is a simple book library built with Next.js that allows users to view a list of books, see detailed information about individual books, and add new books to the library.

## Application Features

### Core Functionality
- **Home Page**: Displays a list of all books with basic information (title, author, genre, rating, etc.)
- **Book Detail Page**: Shows comprehensive information about a specific book when clicked
- **Add Book Form**: Allows users to add new books to the library with validation

### Technical Stack
- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **Backend**: Next.js API routes (fake backend with in-memory storage)
- **Testing**: Playwright (E2E) and Vitest (Unit) configured and ready to use

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run unit tests with Vitest
- `npm run test:e2e` - Run E2E tests with Playwright

## API Endpoints

### GET /api/books
Returns a list of all books

**Response:**
```json
[
  {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Classic",
    "publishedYear": 1925,
    "description": "A story of decadence and excess...",
    "isbn": "978-0743273565",
    "pages": 180,
    "rating": 4.2
  }
]
```

### GET /api/books/[id]
Returns details of a specific book by ID

**Response:**
```json
{
  "id": 1,
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "Classic",
  "publishedYear": 1925,
  "description": "A story of decadence and excess...",
  "isbn": "978-0743273565",
  "pages": 180,
  "rating": 4.2
}
```

### POST /api/books
Adds a new book to the library

**Request Body:**
```json
{
  "title": "Book Title",
  "author": "Author Name",
  "genre": "Fiction",
  "publishedYear": 2024,
  "description": "Book description",
  "isbn": "978-1234567890",
  "pages": 300,
  "rating": 4.5
}
```

**Required Fields:** `title`, `author`