"use server";

import { Book } from "@/types/Book";

export async function fetchBook(isbn: string): Promise<Book | null> {
  const response = await fetch(
    `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`
  );
  const data = await response.json();
  const bookData = data[`ISBN:${isbn}`];

  if (!bookData) {
    return null;
  }

  const amazonIdentifier = bookData.identifiers?.amazon?.[0];

  return {
    isbn,
    title: bookData.title,
    subtitle: bookData.subtitle,
    authors:
      bookData.authors?.map((author: { name: string }) => author.name) || [],
    coverUrl: bookData.cover?.large,
    articleUrl: amazonIdentifier
      ? `https://www.amazon.com/dp/${amazonIdentifier}`
      : `https://www.amazon.com/s?k=${isbn}`,
    publishDate: bookData.publish_date,
    numberOfPages: bookData.number_of_pages,
  };
}
