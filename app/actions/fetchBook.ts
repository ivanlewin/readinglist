'use server'

import { Book } from '@/types/Book'
import { getAmazonLink } from '@/utils/amazonLink'

export async function fetchBook(isbn: string): Promise<Book | null> {
  const response = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`)
  const data = await response.json()
  const bookData = data[`ISBN:${isbn}`]

  if (!bookData) {
    return null
  }

  return {
    isbn,
    title: bookData.title,
    authors: bookData.authors?.map((author: { name: string }) => author.name) || [],
    coverUrl: bookData.cover?.medium || '/placeholder.svg?height=180&width=120',
    amazonUrl: getAmazonLink(isbn),
  }
}

