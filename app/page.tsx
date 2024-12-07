'use client'

import { useState } from 'react'
import Image from 'next/image'
import { fetchBook } from './actions/fetchBook'
import { useBookList } from '@/hooks/useBookList'
import { Book } from '@/types/Book'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Trash2 } from 'lucide-react'

export default function ReadingList() {
  const [isbn, setIsbn] = useState('')
  const { books, addBook, removeBook } = useBookList()

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
      <div className="space-y-4">
        {books.map((book: Book) => (
          <Card key={book.isbn} className="h-[150px]">
            <CardContent className="flex items-center gap-4 p-4 h-full">
              <div className="w-[80px] h-[120px] flex-shrink-0">
                <Image
                  src={book.coverUrl}
                  alt={book.title}
                  width={80}
                  height={120}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-grow overflow-hidden">
                <h2 className="text-lg font-semibold truncate">{book.title}</h2>
                <p className="text-sm text-gray-600 truncate">{book.authors.join(', ')}</p>
                <p className="text-xs text-gray-500">ISBN: {book.isbn}</p>
                <a
                  href={book.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline text-sm"
                >
                  View on Amazon
                </a>
              </div>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => removeBook(book.isbn)}
                aria-label="Remove book"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

