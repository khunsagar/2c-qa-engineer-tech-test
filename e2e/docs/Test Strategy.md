Details

To make sure the Book Library app is stable and ready for users through automation and manual testing.

Test Details
Manual and Exploratory Testing

Manual and exploratory testing is done for end-to-end flows, and also for scenarios where network simulation is required.
We also do testing on native devices to check application compatibility on mobile browsers.

Automation Testing

We try to follow the test pyramid where most of the testing related to field-level validations should be covered as part of unit tests, including edge cases.

Sanity Test

We test pages in isolation as part of sanity testing, where we land directly on URLs instead of going through the landing page.
Example: /book/{bookId}, /add-book.
This gives us confidence and keeps the focus on the intent of the test.

Accessibility Test

We have added accessibility tests for the Add Book page and the landing page for now.
As part of this assignment, we decided to cover only critical and serious accessibility issues.

API Test

API tests cover POST and GET calls for various scenarios, which are used to fetch and add books.
We also added security-related scenarios, such as:
Providing an id attribute in the POST request
Using wrong HTTP methods to fetch data

UI Test

This test is a hybrid test and also consists of end-to-end testing.
It covers flows like adding a book and then verifying the details of that book.

Test Automation Locator Strategy

We are relying on Playwright’s native APIs such as getByLabel and getByRole.
For forms, the Add Book flow fields are accessible using labels.
For other pages, we used getByRole, which is more stable.

Test Data Strategy

- We created two test data approaches:
- One is hardcoded test data for verification
- Another is a random data utility that generates data at runtime, which helps avoid test flakiness when running tests in parallel

Framework Architecture Type

- We followed the POM (Page Object Model) approach.
- Locators are separated from pages, and pages are separated from test cases (spec files).
- The same structure is followed for both API and UI tests.
- his helps us accommodate incoming changes easily.

Reporting
- We are using the Playwright HTML report.
- This can be extended to use Allure or any other third-party reporting tool.
- A custom reporter can also be created for a full-fledged framework.

Platform and Browser in Scope

Web:
Tests can be run on Chrome, Edge, Firefox, and WebKit (Safari).
As part of this assignment, we focused only on Chrome and Edge, but commands are added in package.json to run tests on multiple browsers.

Mobile:
Android and iOS browsers can be tested using Playwright simulators, and also on real device browsers to check UI alignment based on viewport dimensions.

Running Tests in Parallel ( Enhancemnet - next)
- Not done as part of this assignment, but can be done as extended scope.
- We can use GitHub Actions, Azure DevOps, or any other similar tool.

Build Pipeline

- When a PR is created, smoke tests should be auto-triggered
- When code is pushed, smoke tests should be triggered
- When smoke tests pass and the PR is approved and ready to merge to main, sanity tests should be triggered

Release Pipeline

- After code is merged to main and before deploying to an environment (e.g., staging), end-to-end regression tests should   run
- Post deployment and before release, QE needs to perform exploratory testing manually

API Tests Execution

- API tests should run as a nightly build using Postman Monitor or Playwright
- QE responsibility is to ensure API tests are green during release week
- Any API failure during release week should be treated as a critical issue and prioritized