'use client'

import { useState } from 'react'
import { Book } from '@/types/Book'

export function useBookList() {
  const [books, setBooks] = useState<Book[]>([])

  const addBook = (book: Book) => {
    setBooks((prevBooks) => [...prevBooks, book])
  }

  const removeBook = (isbn: string) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.isbn !== isbn))
  }

  return { books, addBook, removeBook }
}

