"use client";

import { useState } from "react";
import { Book } from "@/types/Book";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { fetchBook } from "@/app/actions/fetchBook";
import { toast } from "sonner";
import { isValidISBN } from "@/utils";

interface AddBookFormProps {
  onAdd: (book: Book) => void;
  books: Book[];
}

export function AddBookForm({ onAdd, books }: AddBookFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isbn, setIsbn] = useState("");
  const [newBook, setNewBook] = useState<Book>({
    isbn: "",
    title: "",
    subtitle: "",
    authors: [],
    coverUrl: "",
    articleUrl: "",
    publishDate: "",
    numberOfPages: undefined,
  });

  const handleIsbnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidISBN(isbn)) {
      toast.error("Invalid format. Please enter an ISBN-10 or ISBN-13 code.");
      return;
    }

    if (books.some((book) => book.isbn === isbn)) {
      toast.info("This book is already in your list.");
      setIsbn("");
      return;
    }

    const book = await fetchBook(isbn);
    if (book) {
      onAdd(book);
      setIsbn("");
    } else {
      alert("Book not found");
    }
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleAuthorsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBook((prev) => ({
      ...prev,
      authors: e.target.value.split(",").map((author) => author.trim()),
    }));
  };

  const handleCustomSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAdd(newBook);
    setNewBook({
      isbn: "",
      title: "",
      subtitle: "",
      authors: [],
      coverUrl: "",
      articleUrl: "",
      publishDate: "",
      numberOfPages: undefined,
    });
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
      <div className="flex items-center justify-between">
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <h2 className="text-lg font-semibold">Add book</h2>
          <div className="h-4 w-4">
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle add book form</span>
          </div>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Add book</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="isbn">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="isbn">By ISBN</TabsTrigger>
                <TabsTrigger value="custom">Enter details</TabsTrigger>
              </TabsList>
              <TabsContent value="isbn">
                <form onSubmit={handleIsbnSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="isbn">ISBN</Label>
                    <Input
                      id="isbn"
                      value={isbn}
                      onChange={(e) => setIsbn(e.target.value)}
                      placeholder="Enter ISBN"
                      required
                    />
                  </div>
                  <Button type="submit">Add Book</Button>
                </form>
              </TabsContent>
              <TabsContent value="custom">
                <form onSubmit={handleCustomSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={newBook.title}
                      onChange={handleCustomChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="subtitle">Subtitle</Label>
                    <Input
                      id="subtitle"
                      name="subtitle"
                      value={newBook.subtitle || ""}
                      onChange={handleCustomChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="authors">Authors (comma-separated)</Label>
                    <Input
                      id="authors"
                      name="authors"
                      value={newBook.authors.join(", ")}
                      onChange={handleAuthorsChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="isbn">ISBN</Label>
                    <Input
                      id="isbn"
                      name="isbn"
                      value={newBook.isbn}
                      onChange={handleCustomChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="articleUrl">Article URL</Label>
                    <Input
                      id="articleUrl"
                      name="articleUrl"
                      value={newBook.articleUrl}
                      onChange={handleCustomChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="coverUrl">Cover Image URL</Label>
                    <Input
                      id="coverUrl"
                      name="coverUrl"
                      value={newBook.coverUrl}
                      onChange={handleCustomChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="publishDate">Publish Date</Label>
                    <Input
                      id="publishDate"
                      name="publishDate"
                      value={newBook.publishDate || ""}
                      onChange={handleCustomChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="numberOfPages">Number of Pages</Label>
                    <Input
                      id="numberOfPages"
                      name="numberOfPages"
                      type="number"
                      value={newBook.numberOfPages || ""}
                      onChange={handleCustomChange}
                    />
                  </div>
                  <Button type="submit">Add Book</Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
}
