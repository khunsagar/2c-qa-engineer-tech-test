import { test, expect } from '@playwright/test';
import { BooksApiPage } from '../../pages/books.api.page';
import { ApiAssertions } from '../../utility/helper/apiAssertions';


let booksApi: BooksApiPage;

test.describe('Feature: Create New Book', () => {
  test.beforeEach(async ({ request, baseURL }) => {
    booksApi = new BooksApiPage(request, baseURL!);
  });

  test('Scenario: Successfully create book with only required fields', async () => {
    await booksApi.createMinimalBook();
    await booksApi.verifyBookMatchesCreationData();
    await booksApi.verifyDefaultValuesApplied();
  });

  test('Scenario: Successfully create book with all fields provided', async () => {
    await booksApi.createCompleteBook();
    await booksApi.verifyBookMatchesCreationData();
  });

  test('Scenario: Fail to create book when title is missing', async () => {
    await ApiAssertions.verifyValidationError(
      await booksApi.attemptCreateWithoutTitle(),
      'required'
    );
  });

  test('Scenario: Fail to create book when author is missing', async () => {
    await ApiAssertions.verifyValidationError(
      await booksApi.attemptCreateWithoutAuthor(),
      'required'
    );
  });

  test('Sceanrios: verify 404 error when user enter only optional field ', async ({ request }) => {
    const payload = { genre: 'Fiction' };
    const response = await request.post('/api/books', { data: payload });
    expect(response.status()).toBe(400);
  });

  test('Sceanrios: verify 404 error when user incorrect path varibale  ', async ({ request }) => {
    const payload = { title: 'Test Book', author: 'Test Author' };
    const response = await request.post('/api/book/', { data: payload });
    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(404);
  });
});

test.describe('Feature: Book Creation and Retrieval Flow', () => {
  test.beforeEach(async ({ request, baseURL }) => {
    booksApi = new BooksApiPage(request, baseURL!);
  });

  test('Scenario: Create a book and verify response', async () => {
    await booksApi.createBookForIntegration();
    await booksApi.verifyBookMatchesCreationData();
    await booksApi.verifyAllFieldsPresent();
  });

  test.fixme('Scenario: Create and retrieve book in single flow - Dev to fix in-memory storage persistence', async () => {
    await booksApi.createAndRetrieveBookWithThen();
  });
});

test.describe('Feature: Rating Field Validation', () => {
  test.beforeEach(async ({ request, baseURL }) => {
    booksApi = new BooksApiPage(request, baseURL!);
  });

  test('Scenario: Accept minimum boundary rating value (0)', async () => {
    await booksApi.createBookWithRating(0);
    await booksApi.verifyRatingValue(0);
  });

  test('Scenario: Accept maximum boundary rating value (5)', async () => {
    await booksApi.createBookWithRating(5);
    await booksApi.verifyRatingValue(5);
  });

  test('Scenario: Accept valid decimal rating (3.5)', async () => {
    await booksApi.createBookWithRating(3.5);
    await booksApi.verifyRatingValue(3.5);
  });

  test.fixme('Scenario: Reject rating below minimum (-1)', async () => {
    const response = await booksApi.attemptCreateBookWithInvalidRating(-1);
    await ApiAssertions.verifyInvalidRating(response);
  });

  test.fixme('Scenario: Reject rating above maximum (6)', async () => {
    const response = await booksApi.attemptCreateBookWithInvalidRating(6);
    await ApiAssertions.verifyInvalidRating(response);
  });

  test.fixme('Scenario: System should reject client-provided ID', async () => {
    const response = await booksApi.attemptCreateBookWithClientId(222222);
    console.log('Response Status:', JSON.stringify(response));
  });

  test.fixme('Scenario: Reject duplicate book with same title, author and ISBN', async () => {
    const duplicateResponse = await booksApi.createBookAndAttemptDuplicate();
    await ApiAssertions.verifyDuplicateBookRejected(duplicateResponse);
  });
});