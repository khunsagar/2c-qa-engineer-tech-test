import { APIRequestContext } from '@playwright/test';
import { RandomDataGenerator } from './randomDataGenerator';

export class ApiHelper {
  private baseURL: string;
  private request: APIRequestContext;

  constructor(request: APIRequestContext, baseURL: string | undefined) {
    this.request = request;
    this.baseURL = baseURL || 'http://localhost:3000';
  }


  async createBook(bookData?: any) {
    const data = bookData || RandomDataGenerator.generateCompleteBook();
    
    const response = await this.request.post(`${this.baseURL}/api/books`, {
      data
    });

    if (response.status() !== 201) {
      throw new Error(`Failed to create book. Status: ${response.status()}`);
    }

    return await response.json();
  }


  async getAllBooks() {
    const response = await this.request.get(`${this.baseURL}/api/books`);
    return await response.json();
  }


  async getBookById(id: number) {
    const response = await this.request.get(`${this.baseURL}/api/books/${id}`);
    
    if (response.status() === 404) {
      return null;
    }

    return await response.json();
  }

}