'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface BookListControlsProps {
  books: Array<{ authors: string[] }>
  onSearch: (query: string) => void
  onFilter: (author: string) => void
  onSort: (field: 'publishDate' | 'numberOfPages', order: 'asc' | 'desc') => void
}

export function BookListControls({ books, onSearch, onFilter, onSort }: BookListControlsProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [authorFilter, setAuthorFilter] = useState('')
  const [sortField, setSortField] = useState<'publishDate' | 'numberOfPages'>('publishDate')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  useEffect(() => {
    onSearch(searchQuery)
  }, [searchQuery, onSearch])

  const uniqueAuthors = Array.from(new Set(books.flatMap(book => book.authors))).sort()

  const handleSort = (field: 'publishDate' | 'numberOfPages') => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('desc')
    }
    onSort(field, sortOrder === 'asc' ? 'desc' : 'asc')
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Search and Filter</h2>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle search and filter</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-4">
        <div>
          <Label htmlFor="search">Search books</Label>
          <Input
            id="search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search books..."
            className="w-full"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-grow">
            <Label htmlFor="author-filter">Filter by Author</Label>
            <Select value={authorFilter} onValueChange={(value) => {
              setAuthorFilter(value)
              onFilter(value)
            }}>
              <SelectTrigger id="author-filter">
                <SelectValue placeholder="Select author" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Authors</SelectItem>
                {uniqueAuthors.map((author) => (
                  <SelectItem key={author} value={author}>{author}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="sort-by">Sort by</Label>
            <div className="flex gap-2">
              <Button 
                variant={sortField === 'publishDate' ? 'default' : 'outline'} 
                onClick={() => handleSort('publishDate')}
              >
                Publish Date {sortField === 'publishDate' && (sortOrder === 'asc' ? '↑' : '↓')}
              </Button>
              <Button 
                variant={sortField === 'numberOfPages' ? 'default' : 'outline'} 
                onClick={() => handleSort('numberOfPages')}
              >
                Pages {sortField === 'numberOfPages' && (sortOrder === 'asc' ? '↑' : '↓')}
              </Button>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

