Test Plan for Book library app : 

Validate the Book Library small application for Add Book and Book Details features.

Scope of Testing
- Landing page
- Add Book page
- Book Details page

Testing Approach
A combination of manual and automation testing will be performed.
Manual testing will focus on end-to-end flows and edge cases.
Automation testing will cover critical and stable user journeys and API validations.

Test Scenarios

- Landing page verification (page is not empty, accessible on different browsers and platforms)
- Add book with valid data
- Add book with invalid data
- Verify book details
- API validation for GET and POST requests
- Verify error messages

Perform basic accessibility testing

Test Data

- Valid book data
- Invalid book data

Helper functions and random data generator functions

Risks
- Unstable UI might break automation scripts
- Server-side downtime can create issues for API and UI tests
- Testing will be done locally to identify issues early.

Reporting (Deliverables)
Automation and manual test execution reports will be provided

How to Run Automation
Platform details will be added inside the config file in the project

Playwright command can be used to run tests:
npx playwright run --project=<project-name>

Manual Test Scenarios

- Add book under slow network conditions (2G, 3G, 4G, Slow 4G)
- Launch the application URL on real device browsers (Android and iOS) and verify UI and book accessibility
- Perform Add Book flow on Android and iOS devices
- Exploratory testing on different browsers
- Use any AI tool and ask it to add a book by providing the URL (to get feedback on usability issues)
- Security testing using Proxyman or similar tools to mock requests or responses and check for vulnerabilities