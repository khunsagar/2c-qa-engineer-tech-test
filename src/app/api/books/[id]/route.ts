import { NextRequest, NextResponse } from 'next/server';
import { getBookById } from '@/lib/books-data';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const bookId = parseInt(id);
  
  // Simulate some API delay
  await new Promise(resolve => setTimeout(resolve, 150));
  
  const book = getBookById(bookId);
  
  if (!book) {
    return NextResponse.json(
      { error: 'Book not found' },
      { status: 404 }
    );
  }
  
  return NextResponse.json(book);
}
