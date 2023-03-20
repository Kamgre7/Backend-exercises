import { v4 as uuid } from 'uuid';

export type BookDetails = {
  title: string;
  author: string;
  isbn: string;
};

export interface IBook extends BookDetails {
  id: string;
  readonly createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  setTitle(newTitle: string): void;
  setAuthor(newAuthor: string): void;
  setIsbn(newIsbn: string): void;
  setDeletedDate(): void;
}

export class Book implements IBook {
  title: string;
  author: string;
  isbn: string;
  readonly createdAt: Date = new Date();
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

    this.author = newTitle;
    this.updateDate();
  }

  setIsbn(newIsbn: string): void {
    this.checkIfNotEmptyString(newIsbn, 'isbn');

    this.author = newIsbn;
    this.updateDate();
  }

  setDeletedDate(): void {
    this.deletedAt = new Date();
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
