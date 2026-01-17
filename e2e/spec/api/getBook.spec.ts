import { test, expect } from '@playwright/test';
import { BooksApiPage } from '../../pages/books.api.page';
import { ApiAssertions } from '../../utility/helper/apiAssertions';

let booksApi: BooksApiPage;

test.describe('Feature: Retrieve Books', () => {
  test.beforeEach(async ({ request, baseURL }) => {
    booksApi = new BooksApiPage(request, baseURL!);
  });

  test.describe('GET /api/books - List all books', () => {
    test('Scenario: Successfully retrieve list of all books', async () => {
      await booksApi.retrieveAllBooks();
      await booksApi.verifyBooksListNotEmpty();
    });

    test('Scenario: Verify all books have required fields', async () => {
      await booksApi.retrieveAllBooks();
      await booksApi.verifyAllBooksHaveRequiredFields();
    });
    //Schema validation
    test('Scenario: Verify all books have correct data types', async () => {
      await booksApi.retrieveAllBooks();
      await booksApi.verifyAllBooksHaveValidDataTypes();
    });

    test('Negative: Invalid path parameter throws 404 error', async ({ request }) => {
      const response = await request.get('/api/book/');
      expect(response.status()).toBe(404);
      expect(response.ok()).toBeFalsy();
    });

    test('Negative: Using invalid HTTP method (POST) on GET endpoint', async ({ request }) => {
      const response = await request.post('/api/books', { data: {} });
      expect([400, 405]).toContain(response.status());
    });
  });

  test.describe('GET /api/books/:id - Get single book', () => {
    test('Scenario: Successfully retrieve existing book by ID', async () => {
      await booksApi.retrieveBookById(1);
      await booksApi.verifyAllFieldsPresent();
      await booksApi.verifyBookDataStructure();
    });

    test('Scenario: Fail to retrieve non-existent book', async () => {
      await ApiAssertions.verifyBookNotFound(
        await booksApi.attemptRetrieveNonExistentBook()
      );
    });

    test('Scenario: Verify book data structure is correct', async () => {
      await booksApi.retrieveBookById(2);
      await booksApi.verifyBookDataStructure();
    });

    // can be added to unit test 
    test('Scenario: veirfy 404 message when customer enters invalid ID', async ({ request }) => {
      const response = await request.get('/api/books/invalidId');
      expect(response.status()).toBe(404);
    });

    test('Scenario: verify when customer uses invalid HTTP method (DELETE) on GET endpoint', async ({ request }) => {
      const response = await request.delete('/api/books/1');
      expect([405, 400]).toContain(response.status());
    });
  });
});
