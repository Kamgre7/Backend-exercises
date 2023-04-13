import { v4 as uuid } from 'uuid';

export type BookDetails = {
  title: string;
  author: string;
  isbn: string;
};

export interface IBook extends BookDetails {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  setTitle(newTitle: string): void;
  setAuthor(newAuthor: string): void;
  setIsbn(newIsbn: string): void;
}

export class Book implements IBook {
  title: string;
  author: string;
  isbn: string;
  createdAt: Date = new Date();
  updatedAt: Date;
  deletedAt: Date;

  constructor(bookDetails: BookDetails, public readonly id = uuid()) {
    this.validateNewBook(bookDetails);

    this.title = bookDetails.title;
    this.author = bookDetails.author;
    this.isbn = bookDetails.isbn;
  }

  setAuthor(newAuthor: string): void {
    this.checkIfNotEmptyString(newAuthor, 'author');

    this.author = newAuthor;
    this.updateDate();
  }

  setTitle(newTitle: string): void {
    this.checkIfNotEmptyString(newTitle, 'title');

    this.title = newTitle;
    this.updateDate();
  }

  setIsbn(newIsbn: string): void {
    this.checkIfNotEmptyString(newIsbn, 'isbn');

    this.isbn = newIsbn;
    this.updateDate();
  }

  private updateDate(): void {
    this.updatedAt = new Date();
  }

  private validateNewBook(bookDetails: BookDetails): void {
    this.checkIfNotEmptyString(bookDetails.title, 'title');
    this.checkIfNotEmptyString(bookDetails.author, 'author');
    this.checkIfNotEmptyString(bookDetails.isbn, 'isbn');
  }

  private checkIfNotEmptyString(name: string, inputName: string): void {
    const nameTrim = name.trim();

    if (nameTrim.length === 0) {
      throw new Error(`Cannot add book with empty ${inputName}`);
    }
  }
}
