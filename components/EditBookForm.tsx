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
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
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
        <Label htmlFor="articleUrl">Article URL</Label>
        <Input id="articleUrl" name="articleUrl" value={editedBook.articleUrl} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="coverUrl">Cover Image URL</Label>
        <Input id="coverUrl" name="coverUrl" value={editedBook.coverUrl} onChange={handleChange} required />
      </div>
      <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
        <Button type="button" variant="outline" onClick={onCancel} className="w-full sm:w-auto">Cancel</Button>
        <Button type="submit" className="w-full sm:w-auto">Save</Button>
      </div>
    </form>
  )
}

