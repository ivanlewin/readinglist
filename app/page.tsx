'use client'

import { useState } from 'react'
import Image from 'next/image'
import { fetchBook } from './actions/fetchBook'
import { useBookList } from '@/hooks/useBookList'
import { Book } from '@/types/Book'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Trash2, Edit } from 'lucide-react'
import { EditBookForm } from '@/components/EditBookForm'

export default function ReadingList() {
  const [isbn, setIsbn] = useState('')
  const { books, addBook, removeBook, editBook } = useBookList()
  const [editingBook, setEditingBook] = useState<string | null>(null)

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

  const handleEdit = (isbn: string) => {
    setEditingBook(isbn)
  }

  const handleSaveEdit = (updatedBook: Book) => {
    editBook(editingBook!, updatedBook)
    setEditingBook(null)
  }

  const handleCancelEdit = () => {
    setEditingBook(null)
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
              {editingBook === book.isbn ? (
                <EditBookForm book={book} onSave={handleSaveEdit} onCancel={handleCancelEdit} />
              ) : (
                <>
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
                  <div className="flex flex-col space-y-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(book.isbn)}
                      aria-label="Edit book"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeBook(book.isbn)}
                      aria-label="Remove book"
                      className="bg-black text-white hover:bg-gray-800"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

