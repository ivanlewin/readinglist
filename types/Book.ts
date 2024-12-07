export interface Book {
  isbn: string;
  title: string;
  subtitle?: string;
  authors: string[];
  coverUrl: string;
  articleUrl: string;
  publishDate?: string;
  numberOfPages?: number;
}

