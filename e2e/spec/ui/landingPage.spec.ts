import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages';
import { checkBrokenLinks } from '../../utility/checkLinks';

test.describe.serial('Landing Page (Home)', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test('shoudl check for broken links', async () => {
    await checkBrokenLinks(homePage.page);
  });

  test('each book card should display title, author and rating', async () => {
    const booksCount = await homePage.getBooksCount();
    expect(booksCount).toBeGreaterThan(0);
    await homePage.assertAllBooksHaveTitleAndAuthor();
  });

  test('should navigate to book details page when a book is clicked', async () => {
    const booksCount = await homePage.getBooksCount();
    expect(booksCount).toBeGreaterThan(0);

    await homePage.clickBookCard(0);
    await expect(homePage.page).toHaveURL(/book/i);
  });

  test('should navigate to Add Book page when Add New Book is clicked', async () => {
    await homePage.clickAddNewBook();
    await homePage.verifyAddBookPageNavigation();
  });

  test.skip('should retain identical books list after page refresh', async () => {
    await homePage.assertBooksListPersistsAfterRefresh();
  });

  test.fixme('should not break UI when there are no books (empty state)', async () => {
    // This test assumes backend can return empty list
    // OR can be mocked in real projects
  })

  test.fixme('should load landing page within acceptable time', async () => {
    // Performance testing is generally out of scope for E2E tests
  });
});
