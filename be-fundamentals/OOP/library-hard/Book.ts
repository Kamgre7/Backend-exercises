import { v4 as uuid } from 'uuid';

export type BookDetails = {
  title: string;
  author: string;
  isbn: string;
};

export type IBook = {
  id: string;
} & BookDetails;

export class Book implements IBook {
  public title: string;
  public author: string;
  public isbn: string;

  constructor(bookDetails: BookDetails, public readonly id = uuid()) {
    this.validateNewBook(bookDetails);

    this.title = bookDetails.title;
    this.author = bookDetails.author;
    this.isbn = bookDetails.isbn;
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
