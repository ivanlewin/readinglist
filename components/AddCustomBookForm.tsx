'use client'

import { useState } from 'react'
import { Book } from '@/types/Book'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface AddCustomBookFormProps {
  onAdd: (book: Book) => void
  onCancel: () => void
}

export function AddCustomBookForm({ onAdd, onCancel }: AddCustomBookFormProps) {
  const [newBook, setNewBook] = useState<Book>({
    isbn: '',
    title: '',
    subtitle: '',
    authors: [],
    coverUrl: '',
    articleUrl: '',
    publishDate: '',
    numberOfPages: undefined,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewBook((prev) => ({ ...prev, [name]: value }))
  }

  const handleAuthorsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBook((prev) => ({ ...prev, authors: e.target.value.split(',').map((author) => author.trim()) }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd(newBook)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Custom Book</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" value={newBook.title} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input id="subtitle" name="subtitle" value={newBook.subtitle || ''} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="authors">Authors (comma-separated)</Label>
            <Input id="authors" name="authors" value={newBook.authors.join(', ')} onChange={handleAuthorsChange} required />
          </div>
          <div>
            <Label htmlFor="isbn">ISBN</Label>
            <Input id="isbn" name="isbn" value={newBook.isbn} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="articleUrl">Article URL</Label>
            <Input id="articleUrl" name="articleUrl" value={newBook.articleUrl} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="coverUrl">Cover Image URL</Label>
            <Input id="coverUrl" name="coverUrl" value={newBook.coverUrl} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="publishDate">Publish Date</Label>
            <Input id="publishDate" name="publishDate" value={newBook.publishDate || ''} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="numberOfPages">Number of Pages</Label>
            <Input 
              id="numberOfPages" 
              name="numberOfPages" 
              type="number" 
              value={newBook.numberOfPages || ''} 
              onChange={handleChange} 
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
            <Button type="submit">Add Book</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

