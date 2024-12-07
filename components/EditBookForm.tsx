'use client'

import { useState } from 'react'
import { Book } from '@/types/Book'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

interface EditBookFormProps {
  book: Book
  onSave: (updatedBook: Book) => void
  onCancel: () => void
}

export function EditBookForm({ book, onSave, onCancel }: EditBookFormProps) {
  const [editedBook, setEditedBook] = useState<Book>(book)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedBook((prev) => ({ ...prev, [name]: value }))
  }

  const handleAuthorsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedBook((prev) => ({ ...prev, authors: e.target.value.split(',').map((author) => author.trim()) }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(editedBook)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" value={editedBook.title} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="authors">Authors (comma-separated)</Label>
        <Input id="authors" name="authors" value={editedBook.authors.join(', ')} onChange={handleAuthorsChange} required />
      </div>
      <div>
        <Label htmlFor="isbn">ISBN</Label>
        <Input id="isbn" name="isbn" value={editedBook.isbn} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="amazonUrl">Amazon URL</Label>
        <Input id="amazonUrl" name="amazonUrl" value={editedBook.amazonUrl} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="coverUrl">Cover Image URL</Label>
        <Input id="coverUrl" name="coverUrl" value={editedBook.coverUrl} onChange={handleChange} required />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}

