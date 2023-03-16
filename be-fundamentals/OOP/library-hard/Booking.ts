export type IBooking = {
  bookId: string;
  bookedAt: Date;
};

export class Booking implements IBooking {
  constructor(public bookId: string, public readonly bookedAt = new Date()) {}
}
