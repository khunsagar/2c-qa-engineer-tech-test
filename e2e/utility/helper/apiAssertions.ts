import { expect, APIResponse } from '@playwright/test';

export class ApiAssertions {
  
  static async verifySuccessfulCreation(response: APIResponse) {
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(typeof body.id).toBe('number');
    return body;
  }

  static async verifyBookRetrieved(response: APIResponse) {
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('author');
    return body;
  }

  static async verifyBookNotFound(response: APIResponse) {
    expect(response.status()).toBe(404);
    const error = await response.json();
    expect(error).toHaveProperty('error');
    expect(error.error).toContain('not found');
    return error;
  }

  static async verifyValidationError(response: APIResponse, expectedMessage?: string) {
    expect(response.status()).toBe(400);
    const error = await response.json();
    expect(error).toHaveProperty('error');
    if (expectedMessage) {
      expect(error.error).toContain(expectedMessage);
    }
    return error;
  }

  static async verifyBookHasAllFields(book: any) {
    const requiredFields = ['id', 'title', 'author', 'genre', 'publishedYear', 'description', 'isbn', 'pages', 'rating'];
    requiredFields.forEach(field => {
      expect(book).toHaveProperty(field);
    });
  }

  static verifyBookMatchesRequest(createdBook: any, requestData: any) {
    expect(createdBook.title).toBe(requestData.title);
    expect(createdBook.author).toBe(requestData.author);
    
    if (requestData.genre) expect(createdBook.genre).toBe(requestData.genre);
    if (requestData.publishedYear) expect(createdBook.publishedYear).toBe(requestData.publishedYear);
    if (requestData.description) expect(createdBook.description).toBe(requestData.description);
    if (requestData.isbn) expect(createdBook.isbn).toBe(requestData.isbn);
    if (requestData.pages) expect(createdBook.pages).toBe(requestData.pages);
    if (requestData.rating) expect(createdBook.rating).toBe(requestData.rating);
  }

  static verifyDefaultsApplied(book: any) {
    expect(book).toHaveProperty('genre');
    expect(book).toHaveProperty('publishedYear');
    expect(book).toHaveProperty('description');
    expect(book).toHaveProperty('isbn');
    expect(book).toHaveProperty('pages');
    expect(book).toHaveProperty('rating');
  }

  static verifyDataTypes(book: any) {
    expect(typeof book.id).toBe('number');
    expect(typeof book.title).toBe('string');
    expect(typeof book.author).toBe('string');
    expect(typeof book.genre).toBe('string');
    expect(typeof book.publishedYear).toBe('number');
    expect(typeof book.description).toBe('string');
    expect(typeof book.isbn).toBe('string');
    expect(typeof book.pages).toBe('number');
    expect(typeof book.rating).toBe('number');
  }

  static verifyRatingInRange(rating: number) {
    expect(rating).toBeGreaterThanOrEqual(0);
    expect(rating).toBeLessThanOrEqual(5);
  }

  static async verifyInvalidRating(response: APIResponse) {
    if (response.status() === 400) {
      const error = await response.json();
      expect(error).toHaveProperty('error');
      expect(error.error).toMatch(/rating|invalid|range/i);
    } else if (response.status() === 201) {
      const book = await response.json();
      expect(book.rating).toBeGreaterThanOrEqual(0);
      expect(book.rating).toBeLessThanOrEqual(5);
    }
  }

  static verifyRatingValue(actualRating: number, expectedRating: number) {
    expect(actualRating).toBeCloseTo(expectedRating, 1);
  }

  static async verifyBooksListRetrieved(response: APIResponse) {
    expect(response.status()).toBe(200);
    const books = await response.json();
    expect(Array.isArray(books)).toBe(true);
    return books;
  }

  static verifyBooksListNotEmpty(books: any[]) {
    expect(books.length).toBeGreaterThan(0);
  }

  static verifyAllBooksHaveRequiredFields(books: any[]) {
    const requiredFields = ['id', 'title', 'author', 'genre', 'publishedYear', 'description', 'isbn', 'pages', 'rating'];
    books.forEach((book, index) => {
      requiredFields.forEach(field => {
        expect(book, `Book at index ${index} should have field: ${field}`).toHaveProperty(field);
      });
    });
  }

  static verifySystemGeneratesId(createdBook: any, clientProvidedId: number) {
    expect(createdBook).toHaveProperty('id');
    expect(typeof createdBook.id).toBe('number');
    expect(createdBook.id).not.toBe(clientProvidedId);
    expect(createdBook.id).toBeGreaterThan(0);
  }

  static async verifyClientIdRejected(response: APIResponse) {
    expect(response.status()).toBe(400);
  }

  static async verifyDuplicateBookRejected(response: APIResponse) {
    expect(response.status()).toBe(400);
    const error = await response.json();
    expect(error).toHaveProperty('error');
    expect(error.error).toMatch(/duplicate|already exists|exist/i);
  }
}