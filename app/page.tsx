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
import { Edit, ExternalLinkIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

export default function ReadingList() {
  const { books, addBook, removeBook, editBook } = useBookList();
  const [editingBook, setEditingBook] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [sortField, setSortField] = useState<SortField>("title");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const filteredAndSortedBooks = useMemo(
    () =>
      books
        .filter((book) => {
          if (!searchQuery) {
            return true;
          }

          const matchesAuthor =
            authorFilter === "" ||
            authorFilter === "all-authors" ||
            book.authors.some((author) => author === authorFilter);
          if (!matchesAuthor) {
            return false;
          }

          const query = searchQuery.toLowerCase();
          const matchesSearch =
            book.isbn === query ||
            book.title.toLowerCase().includes(query) ||
            book.subtitle?.toLowerCase().includes(query) ||
            book.authors.some((author) => author.toLowerCase().includes(query));
          return matchesSearch;
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
        }),
    [books, searchQuery, authorFilter, sortField, sortOrder]
  );

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
    <div className="container mx-auto p-4 max-w-screen-lg">
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
      <div className="flex flex-col gap-4">
        {filteredAndSortedBooks.map((book: Book) => (
          <Card key={book.isbn} className="h-52">
            <CardContent className="flex flex-col items-center justify-between p-4 h-full">
              {editingBook === book.isbn ? (
                <EditBookForm
                  book={book}
                  onSave={handleSaveEdit}
                  onCancel={handleCancelEdit}
                />
              ) : (
                <>
                  <div className="flex shrink w-full gap-4 px-2">
                    <div className="h-32 grow-0 shrink-0 basis-28">
                      <Image
                        src={book.coverUrl || "/placeholder.svg"}
                        alt={book.title}
                        height={80}
                        width={120}
                        className={cn(
                          "w-full h-full",
                          book.coverUrl ? "object-contain" : "object-cover"
                        )}
                      />
                    </div>
                    <div className="flex flex-col basis-full shrink overflow-hidden">
                      <h2
                        className="text-lg font-semibold truncate"
                        title={book.title}
                      >
                        {book.title}
                      </h2>
                      {book.subtitle ? (
                        <p className="text-sm leading-4 text-gray-600 italic truncate">
                          {book.subtitle}
                        </p>
                      ) : null}
                      <p className="text-sm leading-4 text-gray-600 truncate">
                        by {book.authors.join(", ")}
                      </p>
                      {book.numberOfPages ? (
                        <p className="text-xs text-gray-500">
                          Pages: {book.numberOfPages}
                        </p>
                      ) : null}
                      {book.publishDate ? (
                        <p className="text-xs text-gray-500">
                          Published: {book.publishDate}
                        </p>
                      ) : null}
                      <p className="text-xs text-gray-500">ISBN: {book.isbn}</p>
                      <a
                        href={book.articleUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 mt-auto hover:underline text-sm flex items-center gap-2"
                      >
                        Buy online
                        <ExternalLinkIcon className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(book.isbn)}
                      aria-label="Edit book"
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeBook(book.isbn)}
                      aria-label="Remove book"
                    >
                      <Trash2 className="h-3 w-3" />
                      Remove
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
