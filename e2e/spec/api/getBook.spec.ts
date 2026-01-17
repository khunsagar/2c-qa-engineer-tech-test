import { test } from '@playwright/test';
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

    test('Scenario: Verify all books have correct data types', async () => {
      await booksApi.retrieveAllBooks();
      await booksApi.verifyAllBooksHaveValidDataTypes();
    });
  });

  test.describe('GET /api/books/:id - Get single book', () => {
    test.only('Scenario: Successfully retrieve existing book by ID', async () => {
      await booksApi.retrieveBookById(222222);
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
  });
})
