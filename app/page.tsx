'use client'

import { useState } from 'react'
import Image from 'next/image'
import { fetchBook } from './actions/fetchBook'
import { useBookList } from '@/hooks/useBookList'
import { Book } from '@/types/Book'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function ReadingList() {
  const [isbn, setIsbn] = useState('')
  const { books, addBook } = useBookList()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const book = await fetchBook(isbn)
    if (book) {
      addBook(book)
      setIsbn('')
    } else {
      alert('Book not found')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Reading List</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <Input
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            placeholder="Enter ISBN"
            className="flex-grow"
          />
          <Button type="submit">Add Book</Button>
        </div>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book: Book) => (
          <Card key={book.isbn}>
            <CardContent className="flex gap-4 p-4">
              <Image
                src={book.coverUrl}
                alt={book.title}
                width={120}
                height={180}
                className="object-cover"
              />
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{book.title}</h2>
                  <p className="text-sm text-gray-600">{book.authors.join(', ')}</p>
                  <p className="text-xs text-gray-500">ISBN: {book.isbn}</p>
                </div>
                <a
                  href={book.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View on Amazon
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

