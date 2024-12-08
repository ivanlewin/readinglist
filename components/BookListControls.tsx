"use client";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectSeparator } from "@radix-ui/react-select";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

export type SortField = "publishDate" | "numberOfPages" | "title";
export type SortOrder = "asc" | "desc";

interface BookListControlsProps {
  books: Array<{ authors: string[] }>;
  sortField: SortField;
  sortOrder: SortOrder;
  onSearch: (query: string) => void;
  onFilter: (author: string) => void;
  onSortFieldChange: (field: SortField) => void;
  onSortOrderChange: (order: SortOrder) => void;
}

export function BookListControls({
  books,
  onSearch,
  onFilter,
  onSortFieldChange,
  onSortOrderChange,
  sortField,
  sortOrder,
}: BookListControlsProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");

  useEffect(() => {
    onSearch(searchQuery);
  }, [searchQuery, onSearch]);

  const uniqueAuthors = Array.from(
    new Set(books.flatMap((book) => book.authors))
  ).sort();

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      onSortOrderChange(sortOrder === "asc" ? "desc" : "asc");
    } else {
      onSortFieldChange(field);
      onSortOrderChange("desc");
    }
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
      <div className="flex items-center justify-between">
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <h2 className="text-lg font-semibold">Search and Filter</h2>
          <div className="h-4 w-4">
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle search and filter</span>
          </div>
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
            <Label htmlFor="author-filter">Filter by author</Label>
            <Select
              value={authorFilter}
              onValueChange={(value) => {
                setAuthorFilter(value);
                onFilter(value);
              }}
            >
              <SelectTrigger id="author-filter">
                <SelectValue placeholder="Select author" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-authors" className="opacity-70">
                  All Authors
                </SelectItem>
                {uniqueAuthors.length > 0 ? (
                  <SelectSeparator className="h-px m-1 bg-neutral-600" />
                ) : null}
                {uniqueAuthors.map((author) => (
                  <SelectItem key={author} value={author}>
                    {author}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="sort-by">Sort by</Label>
            <div className="flex gap-2">
              <Button
                variant={sortField === "title" ? "default" : "outline"}
                onClick={() => handleSort("title")}
              >
                Title{" "}
                {sortField === "title" && (sortOrder === "asc" ? "↑" : "↓")}
              </Button>
              <Button
                variant={sortField === "publishDate" ? "default" : "outline"}
                onClick={() => handleSort("publishDate")}
              >
                Publish Date{" "}
                {sortField === "publishDate" &&
                  (sortOrder === "asc" ? "↑" : "↓")}
              </Button>
              <Button
                variant={sortField === "numberOfPages" ? "default" : "outline"}
                onClick={() => handleSort("numberOfPages")}
              >
                Pages{" "}
                {sortField === "numberOfPages" &&
                  (sortOrder === "asc" ? "↑" : "↓")}
              </Button>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
