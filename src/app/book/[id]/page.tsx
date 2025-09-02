'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Book } from '@/types/book';

export default function BookDetail() {
  const params = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      fetchBook(params.id as string);
    }
  }, [params.id]);

  const fetchBook = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/books/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Book not found');
        }
        throw new Error('Failed to fetch book');
      }
      const data = await response.json();
      setBook(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading book details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">Error</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link 
            href="/"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Library
          </Link>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-600 text-xl mb-4">Book not found</div>
          <Link 
            href="/"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Library
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link 
            href="/"
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            ← Back to Library
          </Link>
        </div>

        {/* Book Details */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {book.title}
                </h1>
                <p className="text-xl text-gray-600">by {book.author}</p>
              </div>
              <div className="flex items-center text-yellow-500 ml-4">
                <span className="text-2xl font-bold mr-2">{book.rating}</span>
                <span className="text-2xl">⭐</span>
              </div>
            </div>

            {/* Book Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Genre
                  </h3>
                  <p className="mt-1 text-lg text-gray-900">{book.genre}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Published Year
                  </h3>
                  <p className="mt-1 text-lg text-gray-900">{book.publishedYear}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Pages
                  </h3>
                  <p className="mt-1 text-lg text-gray-900">{book.pages} pages</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    ISBN
                  </h3>
                  <p className="mt-1 text-lg text-gray-900 font-mono">{book.isbn}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Rating
                  </h3>
                  <div className="mt-1 flex items-center">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(book.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">({book.rating}/5)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {book.description}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <Link 
            href="/"
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Back to Library
          </Link>
          <Link 
            href="/add-book"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Another Book
          </Link>
        </div>
      </div>
    </div>
  );
}
