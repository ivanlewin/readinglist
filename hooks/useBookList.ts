'use client'

import { useState } from 'react'
import { Book } from '@/types/Book'

export function useBookList() {
  const [books, setBooks] = useState<Book[]>([])

  const addBook = (book: Book) => {
    setBooks((prevBooks) => [...prevBooks, book])
  }

  return { books, addBook }
}

