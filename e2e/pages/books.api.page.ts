import { APIRequestContext } from '@playwright/test';
import { ApiClient } from '../utility/helper/apiClient';
import { TestDataGenerator } from '../utility/testDataGenerator';
import { ApiAssertions } from '../utility/helper/apiAssertions';
import { RandomDataGenerator } from "../utility/randomDataGenerator";


export class BooksApiPage {
  private apiClient: ApiClient;
  private lastCreatedBook: any;
  private lastBookData: any;
  private booksList: any[];

  constructor(request: APIRequestContext, baseURL: string) {
    this.apiClient = new ApiClient(request, baseURL);
    this.booksList = [];
  }
  

  async createMinimalBook() {
    this.lastBookData = {
      title: RandomDataGenerator.randomTitle(),
      author: RandomDataGenerator.randomAuthor()
    };
    const response = await this.apiClient.createBook(this.lastBookData);
    this.lastCreatedBook = await ApiAssertions.verifySuccessfulCreation(response);
  }

  async createCompleteBook() {
    this.lastBookData = RandomDataGenerator.generateCompleteBook();
    const response = await this.apiClient.createBook(this.lastBookData);
    this.lastCreatedBook = await ApiAssertions.verifySuccessfulCreation(response);
  }

  async createBookForIntegration() {
    this.lastBookData = RandomDataGenerator.generateCompleteBook();
    const response = await this.apiClient.createBook(this.lastBookData);
    this.lastCreatedBook = await ApiAssertions.verifySuccessfulCreation(response);
  }

  async createAndRetrieveBook() {
    this.lastBookData = RandomDataGenerator.generateCompleteBook();
    const createResponse = await this.apiClient.createBook(this.lastBookData);
    this.lastCreatedBook = await ApiAssertions.verifySuccessfulCreation(createResponse);
    
    const retrieveResponse = await this.apiClient.getBookById(this.lastCreatedBook.id);
    const retrievedBook = await ApiAssertions.verifyBookRetrieved(retrieveResponse);
    console.log('Retrieved book with ID:', retrievedBook.id);
    
    // Store the retrieved book
    this.lastCreatedBook = retrievedBook;
  }


  async createAndRetrieveBookWithThen() {
    this.lastBookData = RandomDataGenerator.generateCompleteBook();
    
    return this.apiClient.createBook(this.lastBookData)
      .then(async (createResponse) => {
        // Assert creation response
        this.lastCreatedBook = await ApiAssertions.verifySuccessfulCreation(createResponse);
        ApiAssertions.verifyBookMatchesRequest(this.lastCreatedBook, this.lastBookData);
        await ApiAssertions.verifyBookHasAllFields(this.lastCreatedBook);
        return this.lastCreatedBook.id;
      })
      .then(async (bookId) => {
        // Chain retrieval and assert
        const retrieveResponse = await this.apiClient.getBookById(bookId);
        this.lastCreatedBook = await ApiAssertions.verifyBookRetrieved(retrieveResponse);
        ApiAssertions.verifyDataTypes(this.lastCreatedBook);
        console.log('Retrieved book with ID:', this.lastCreatedBook.id);
        return this.lastCreatedBook;
      });
  }

  async attemptCreateWithoutTitle() {
    const invalidData = TestDataGenerator.invalidBook.missingTitle;
    return await this.apiClient.createBook(invalidData);
  }

  async attemptCreateWithoutAuthor() {
    const invalidData = TestDataGenerator.invalidBook.missingAuthor;
    return await this.apiClient.createBook(invalidData);
  }

  async retrieveBookById(bookId: number) {
    const response = await this.apiClient.getBookById(bookId);
    console.log('Retrieve Book Response Status:', JSON.stringify(response));
    this.lastCreatedBook = await ApiAssertions.verifyBookRetrieved(response);
  }

  async retrieveCreatedBook() {
    console.log('Retrieving book with ID:', this.lastCreatedBook.id);
    const response = await this.apiClient.getBookById(this.lastCreatedBook.id);
    console.log('Retrieve Created Book Response Status:', JSON.stringify(response));
    //this.lastCreatedBook = await ApiAssertions.verifyBookRetrieved(response);
  }

  async attemptRetrieveNonExistentBook() {
    const nonExistentId = 99999;
    return await this.apiClient.getBookById(nonExistentId);
  }

  async verifyBookMatchesCreationData() {
    ApiAssertions.verifyBookMatchesRequest(this.lastCreatedBook, this.lastBookData);
  }

  async verifyDefaultValuesApplied() {
    ApiAssertions.verifyDefaultsApplied(this.lastCreatedBook);
  }

  async verifyBookDataStructure() {
    ApiAssertions.verifyDataTypes(this.lastCreatedBook);
    ApiAssertions.verifyRatingInRange(this.lastCreatedBook.rating);
  }

  async verifyAllFieldsPresent() {
    await ApiAssertions.verifyBookHasAllFields(this.lastCreatedBook);
  }

  async verifyRetrievedBookMatchesCreated() {
    return this.lastCreatedBook.id;
  }

  async createBookWithRating(rating: number) {
    this.lastBookData = {
      title: `Rating Test Book ${rating}`,
      author: 'Rating Test Author',
      rating: rating
    };
    const response = await this.apiClient.createBook(this.lastBookData);
    this.lastCreatedBook = await ApiAssertions.verifySuccessfulCreation(response);
  }

  async attemptCreateBookWithInvalidRating(rating: number) {
    const bookData = {
      title: 'Blue Star',
      author: 'Jane Doe',
      rating: rating
    };
    return await this.apiClient.createBook(bookData);
  }

  async verifyRatingValue(expectedRating: number) {
    ApiAssertions.verifyRatingValue(this.lastCreatedBook.rating, expectedRating);
  }

  async retrieveAllBooks() {
    const response = await this.apiClient.getAllBooks();
    this.booksList = await ApiAssertions.verifyBooksListRetrieved(response);
  }

  async verifyBooksListNotEmpty() {
    ApiAssertions.verifyBooksListNotEmpty(this.booksList);
  }

  async verifyAllBooksHaveRequiredFields() {
    ApiAssertions.verifyAllBooksHaveRequiredFields(this.booksList);
  }

  async verifyAllBooksHaveValidDataTypes() {
    this.booksList.forEach(book => {
      ApiAssertions.verifyDataTypes(book);
    });
  }

  async attemptCreateBookWithClientId(clientId: number) {
    const bookData = {
      id: clientId,
      title: 'ID Test Book',
      author: 'ID Test Author'
    };
    return await this.apiClient.createBook(bookData);
  }

  async createBookAndAttemptDuplicate() {
    this.lastBookData = {
      title: 'Duplicate Test Book',
      author: 'Duplicate Test Author',
      isbn: '978-1234567890'
    };
    const firstResponse = await this.apiClient.createBook(this.lastBookData);
    this.lastCreatedBook = await ApiAssertions.verifySuccessfulCreation(firstResponse);
  
    return await this.apiClient.createBook(this.lastBookData);
  }

  async attemptCreateDuplicateWithSameTitleAndAuthor(title: string, author: string) {
    const bookData = { title, author };
    return await this.apiClient.createBook(bookData);
  }
}
