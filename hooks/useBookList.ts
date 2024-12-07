'use client'

import { useState } from 'react'
import { Book } from '@/types/Book'

export function useBookList() {
  const [books, setBooks] = useState<Book[]>([])

  const addBook = (book: Book) => {
    setBooks((prevBooks) => {
      if (prevBooks.some((b) => b.isbn === book.isbn)) {
        alert('This book is already in your list.');
        return prevBooks;
      }
      return [...prevBooks, book];
    });
  };

  const removeBook = (isbn: string) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.isbn !== isbn))
  }

  const editBook = (isbn: string, updatedBook: Book) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.isbn === isbn ? updatedBook : book))
    )
  }

  return { books, addBook, removeBook, editBook }
}

