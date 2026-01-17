import { APIRequestContext } from '@playwright/test';

export class ApiClient {
  constructor(private request: APIRequestContext, private baseURL: string) {}

  async get(endpoint: string) {
    return await this.request.get(`${this.baseURL}${endpoint}`);
  }

  async post(endpoint: string, data: any) {
    return await this.request.post(`${this.baseURL}${endpoint}`, {
      data,
    });
  }

  async getAllBooks() {
    return await this.get('/api/books');
  }

  async getBookById(id: number) {
    return await this.get(`/api/books/${id}`);
  }

  async createBook(book: any) {
    return await this.post('/api/books', book);
  }
}