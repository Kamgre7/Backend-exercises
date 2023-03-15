import { v4 as uuid } from 'uuid';

export type BookInformation = {
  title: string;
  author: string;
  isbn: string;
};

export type IBook = {
  id: string;
} & BookInformation;

export class Book implements IBook {
  public title: string;
  public author: string;
  public isbn: string;

  constructor(bookInformation: BookInformation, public readonly id = uuid()) {
    this.validateNewBook(bookInformation);

    this.title = bookInformation.title;
    this.author = bookInformation.author;
    this.isbn = bookInformation.isbn;
  }

  private validateNewBook(bookInformation: BookInformation): void {
    this.checkIfNotEmptyString(bookInformation.title, 'title');
    this.checkIfNotEmptyString(bookInformation.author, 'author');
    this.checkIfNotEmptyString(bookInformation.isbn, 'isbn');
  }

  private checkIfNotEmptyString(name: string, inputName: string): void {
    const nameTrim = name.trim();

    if (nameTrim.length === 0) {
      throw new Error(`Cannot add book with empty ${inputName}`);
    }
  }
}
