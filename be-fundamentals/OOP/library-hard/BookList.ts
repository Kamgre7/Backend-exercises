import { Book, BookDetails, IBook } from './Book';
import { bookDB } from './libraryDB';

export type BookInformation = {
  book: IBook;
  quantity: number;
};

export interface IBookList {
  books: Map<string, BookInformation>;
  addBook(bookDetails: BookDetails, quantity: number): string;
  deleteBook(bookId: string): void;
  findBookIdByIsbn(isbn: string): string;
  findBookOrThrow(bookId: string): BookInformation;
  findAvailableBooksById(booksId: string[]): string[];
  checkIfNotDeleted(book: IBook): void;
}

export class BookList implements IBookList {
  private static instance: BookList;

  private constructor(public books = bookDB) {}

  static getInstance(books?: Map<string, BookInformation>): BookList {
    if (!BookList.instance) {
      BookList.instance = new BookList(books);
    }

    return BookList.instance;
  }

  addBook(bookDetails: BookDetails, quantity: number): string {
    const book = new Book(bookDetails);

    this.books.set(book.id, {
      book,
      quantity,
    });

    return book.id;
  }

  deleteBook(bookId: string): void {
    const { book } = this.findBookOrThrow(bookId);

    this.checkIfNotDeleted;

    book.deletedAt = new Date();
    book.updatedAt = new Date();
  }

  findAvailableBooksById(booksId: string[]): string[] {
    const availableBooksId = booksId.filter((id) => {
      const book = this.findBookOrThrow(id);

      return book.quantity < 1 || book.book.deletedAt ? false : true;
    });

    return availableBooksId;
  }

  findBookOrThrow(bookId: string): BookInformation {
    if (!this.books.has(bookId)) {
      throw new Error('Book not found');
    }

    return this.books.get(bookId);
  }

  findBookIdByIsbn(isbn: string): string {
    const book = [...this.books].find(
      ([id, bookInformation]) => bookInformation.book.isbn === isbn
    );

    return book ? book[0] : null;
  }

  checkIfNotDeleted(book: IBook): void {
    if (book.deletedAt) {
      throw new Error('Book already deleted');
    }
  }
}
