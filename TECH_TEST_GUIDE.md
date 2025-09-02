# QA Engineer Tech Test Guide

## Welcome! 🎉

Congratulations on being invited to complete our QA Engineer technical test! This guide will help you understand what we're looking for and how to approach the test.

## What You're Building

You'll be working with a **Book Library Application** - a simple but functional web app built with Next.js that allows users to:

1. **View a list of books** on the home page
2. **Click on books** to see detailed information
3. **Add new books** through a form

## Your Mission

Your task is to **create a comprehensive test suite** for this application. We want to see how you approach testing different aspects of a web application.

## What We're Looking For

### 1. **E2E Testing with Playwright** (Primary Focus)
- Test the complete user journey
- Cover all main functionality
- Test error scenarios and edge cases
- Consider responsive design testing
- Test form validation and submission

### 2. **Unit Testing with Vitest**
- Test individual components
- Test utility functions
- Mock API calls appropriately
- Test error handling

### 4. **Test Quality & Organization**
- Well-structured, readable tests
- Good test naming conventions
- Proper use of test hooks (beforeEach, afterEach, etc.)
- Meaningful assertions

## Getting Started

### Prerequisites
- Node.js 18+
- Git
- A code editor (VS Code recommended)

### Setup Instructions

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd qa-engineer-tech-test
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Verify the application works:**
   - Open http://localhost:3000
   - You should see a list of books
   - Try clicking on a book to see details
   - Try adding a new book

4. **Run the existing sample tests:**
   ```bash
   # Unit tests
   npm run test
   
   # E2E tests
   npm run test:e2e
   ```

## Application Structure

```
src/
├── app/
│   ├── api/books/          # API endpoints
│   ├── book/[id]/          # Book detail page
│   ├── add-book/           # Add book form
│   └── page.tsx            # Home page
├── lib/
│   └── books-data.ts       # Shared data store
└── types/
    └── book.ts             # TypeScript types

tests/                      # Playwright E2E tests
```

## API Endpoints

### GET /api/books
- Returns all books
- Response: Array of book objects

### GET /api/books/[id]
- Returns a specific book by ID
- Response: Single book object or 404 error

### POST /api/books
- Creates a new book
- Required fields: `title`, `author`
- Response: Created book object or validation error

## Tips for Success

### 1. **Start with E2E Tests**
- Happy path scenarios
- Error scenarios
- Form validation
- Navigation flows

### 2. **Write Meaningful Tests**
- Use descriptive test names
- Test one thing per test
- Make assertions specific and meaningful
- Consider the user's perspective

### 3. **Organize Your Tests**
- Group related tests using `describe` blocks
- Use consistent naming conventions
- Separate concerns (UI, API, etc.)

### 5. **Think Like a QA Engineer**
- Consider edge cases
- Test error scenarios
- Think about user experience
- Consider accessibility

## Submission Guidelines

1. **Create a new fork** for your work, and add the hiring manager as a collaborator. Please ensure that when you fork the repo that you make your repo **private**.
3. **Document your approach** in a separate markdown file
4. **Include test reports** if possible (allure/playwright etc)
5. **Submit a pull request** with your changes when ready

## What We'll Evaluate

- **Test Coverage**: How thoroughly you test the application
- **Test Quality**: Well-structured, maintainable tests
- **Testing Approach**: Understanding of different testing types
- **Documentation**: Clear explanation of your testing strategy

## Questions?

If you have any questions about the tech test, don't hesitate to reach out to the hiring team. We're here to help!

## Good Luck! 🚀

We're excited to see your testing approach and how you think about quality assurance. Take your time, be thorough, and most importantly - have fun with it!

---

**Remember**: This is not just about getting the tests to pass. We want to see your thought process, your approach to testing, and how you think about quality in software development.
