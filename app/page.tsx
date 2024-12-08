"use client";

import { AddBookForm } from "@/components/AddBookForm";
import {
  BookListControls,
  SortField,
  SortOrder,
} from "@/components/BookListControls";
import { EditBookForm } from "@/components/EditBookForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useBookList } from "@/hooks/useBookList";
import { cn } from "@/lib/utils";
import { Book } from "@/types/Book";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

export default function ReadingList() {
  const { books, addBook, removeBook, editBook } = useBookList();
  const [editingBook, setEditingBook] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [sortField, setSortField] = useState<SortField>("title");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const filteredAndSortedBooks = useMemo(() => {
    return books
      .filter((book) => {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          book.title.toLowerCase().includes(query) ||
          book.subtitle?.toLowerCase().includes(query) ||
          book.authors.some((author) => author.toLowerCase().includes(query));
        const matchesAuthor =
          authorFilter === "" ||
          authorFilter === "all-authors" ||
          book.authors.some((author) => author === authorFilter);
        return matchesSearch && matchesAuthor;
      })
      .sort((a, b) => {
        if (sortField === "publishDate") {
          const dateA = new Date(a.publishDate || "").getTime();
          const dateB = new Date(b.publishDate || "").getTime();
          return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        } else if (sortField === "numberOfPages") {
          const pagesA = a.numberOfPages || 0;
          const pagesB = b.numberOfPages || 0;
          return sortOrder === "asc" ? pagesA - pagesB : pagesB - pagesA;
        } else if (sortField === "title") {
          if (sortOrder === "asc") {
            return a.title.localeCompare(b.title);
          } else if (sortOrder === "desc") {
            return b.title.localeCompare(a.title);
          }
        }
        return 0;
      });
  }, [books, searchQuery, authorFilter, sortField, sortOrder]);

  const handleEdit = (isbn: string) => {
    setEditingBook(isbn);
  };

  const handleSaveEdit = (updatedBook: Book) => {
    editBook(editingBook!, updatedBook);
    setEditingBook(null);
  };

  const handleCancelEdit = () => {
    setEditingBook(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Reading List</h1>
      <div className="mb-6">
        <AddBookForm books={books} onAdd={addBook} />
      </div>
      <div className="mb-6">
        <BookListControls
          books={books}
          onFilter={setAuthorFilter}
          onSearch={setSearchQuery}
          onSortFieldChange={setSortField}
          onSortOrderChange={setSortOrder}
          sortField={sortField}
          sortOrder={sortOrder}
        />
      </div>
      <div className="space-y-4">
        {filteredAndSortedBooks.map((book: Book) => (
          <Card key={book.isbn} className="min-h-[150px]">
            <CardContent className="flex flex-col sm:flex-row items-center gap-4 p-4 h-full">
              {editingBook === book.isbn ? (
                <EditBookForm
                  book={book}
                  onSave={handleSaveEdit}
                  onCancel={handleCancelEdit}
                />
              ) : (
                <>
                  <div className="w-[80px] h-[120px] flex-shrink-0">
                    <Image
                      src={book.coverUrl || "/placeholder.svg"}
                      alt={book.title}
                      width={80}
                      height={120}
                      className={cn(
                        "w-full h-full",
                        book.coverUrl ? "object-contain" : "object-cover"
                      )}
                    />
                  </div>
                  <div className="flex-grow overflow-hidden text-center sm:text-left">
                    <h2 className="text-lg font-semibold sm:truncate">
                      {book.title}
                    </h2>
                    {book.subtitle && (
                      <p className="text-sm text-gray-600 italic sm:truncate">
                        {book.subtitle}
                      </p>
                    )}
                    <p className="text-sm text-gray-600 sm:truncate">
                      {book.authors.join(", ")}
                    </p>
                    <p className="text-xs text-gray-500">ISBN: {book.isbn}</p>
                    {book.publishDate && (
                      <p className="text-xs text-gray-500">
                        Published: {book.publishDate}
                      </p>
                    )}
                    {book.numberOfPages && (
                      <p className="text-xs text-gray-500">
                        Pages: {book.numberOfPages}
                      </p>
                    )}
                    <a
                      href={book.articleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline text-sm"
                    >
                      Buy online
                    </a>
                  </div>
                  <div className="flex sm:flex-col space-x-2 sm:space-x-0 sm:space-y-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(book.isbn)}
                      aria-label="Edit book"
                      className="h-8 w-8"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => removeBook(book.isbn)}
                      aria-label="Remove book"
                      className="h-8 w-8 bg-black text-white hover:bg-gray-800"
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
  );
}
