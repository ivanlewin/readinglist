'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface BookListControlsProps {
  onSearch: (query: string) => void
  onFilter: (author: string) => void
  onSort: (field: 'publishDate' | 'numberOfPages') => void
}

export function BookListControls({ onSearch, onFilter, onSort }: BookListControlsProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [authorFilter, setAuthorFilter] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search books..."
          className="flex-grow"
        />
        <Button type="submit">Search</Button>
      </form>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-grow">
          <Label htmlFor="author-filter">Filter by Author</Label>
          <Input
            id="author-filter"
            value={authorFilter}
            onChange={(e) => {
              setAuthorFilter(e.target.value)
              onFilter(e.target.value)
            }}
            placeholder="Enter author name"
          />
        </div>
        <div>
          <Label htmlFor="sort-by">Sort by</Label>
          <Select onValueChange={(value) => onSort(value as 'publishDate' | 'numberOfPages')}>
            <SelectTrigger id="sort-by">
              <SelectValue placeholder="Select field" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="publishDate">Publish Date</SelectItem>
              <SelectItem value="numberOfPages">Number of Pages</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

