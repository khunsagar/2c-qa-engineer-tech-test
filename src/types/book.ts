export type { Book } from '@/lib/books-data';

export interface CreateBookRequest {
  title: string;
  author: string;
  genre?: string;
  publishedYear?: number;
  description?: string;
  isbn?: string;
  pages?: number;
  rating?: number;
}
