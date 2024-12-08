"use client";

import { useEffect, useState } from "react";
import { Book } from "@/types/Book";

function getBooksFromLocalStorage(): Book[] {
  const books = localStorage.getItem("books");
  return books ? JSON.parse(books) : [];
}

function saveBooksToLocalStorage(books: Book[]) {
  localStorage.setItem("books", JSON.stringify(books));
}

export function useBookList() {
  const [books, setBooks] = useState<Book[]>(() =>
    typeof window === "undefined" ? [] : getBooksFromLocalStorage()
  );

  useEffect(() => {
    saveBooksToLocalStorage(books);
  }, [books]);

  const addBook = (book: Book) => {
    setBooks((prevBooks) => {
      if (prevBooks.some((b) => b.isbn === book.isbn)) {
        alert("This book is already in your list.");
        return prevBooks;
      }
      return [...prevBooks, book];
    });
  };

  const removeBook = (isbn: string) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.isbn !== isbn));
  };

  const editBook = (isbn: string, updatedBook: Book) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.isbn === isbn ? updatedBook : book))
    );
  };

  return { books, addBook, removeBook, editBook };
}
