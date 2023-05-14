import {
  Book,
  IBook,
} from '../../../../be-fundamentals/OOP/library-hard/Book/Book';
import {
  Booking,
  BookingDetails,
  IBooking,
} from '../../../../be-fundamentals/OOP/library-hard/Booking/Booking';
import {
  BookingList,
  IBookingList,
} from '../../../../be-fundamentals/OOP/library-hard/Booking/BookingList';
import {
  IUser,
  User,
} from '../../../../be-fundamentals/OOP/library-hard/User/User';
import {
  hpBookDetails,
  johnUserEmail,
  lotrBookDetails,
} from '../utils/constants';

describe('BookingList', () => {
  let harryPotter: IBook;
  let lordOfTheRings: IBook;
  let john: IUser;
  let bookingList: IBookingList;
  let bookings: Map<string, IBooking>;
  let johnBookingDetails: BookingDetails;
  let johnBooking: IBooking;

  beforeAll(() => {
    bookingList = BookingList.getInstance(bookings);
  });

  beforeEach(() => {
    john = new User(johnUserEmail);

    harryPotter = new Book({ ...hpBookDetails });

    lordOfTheRings = new Book({ ...lotrBookDetails });

    johnBookingDetails = {
      bookIds: [harryPotter.id, lordOfTheRings.id],
      userId: john.id,
    };

    johnBooking = new Booking(johnBookingDetails);

    bookings = new Map<string, IBooking>([[johnBooking.id, johnBooking]]);

    bookingList.bookings = bookings;
  });

  it('Should be instance of BookingList', () => {
    expect(bookingList).toBeInstanceOf(BookingList);
  });

  it('Should return already created userList instance, after trying to create a new instance of UserList', () => {
    const secondBookingList = BookingList.getInstance();

    expect(bookingList).toStrictEqual(secondBookingList);
  });

  it('Should add a new booking', () => {
    const bookingDetails = {
      userId: john.id,
      bookIds: [harryPotter.id],
    };

    const booking = new Booking(bookingDetails);
    const bookingId = bookingList.addBooking(booking);

    expect(bookingList.bookings.has(bookingId)).toBeTruthy();
  });

  it('Should find a booking by ID and return it', () => {
    const booking = bookingList.findBookingByIdOrThrow(johnBooking.id);

    expect(booking).toStrictEqual(johnBooking);
  });

  describe('Should throw error when', () => {
    it('Should throw error when booking not found', () => {
      expect(() => {
        bookingList.findBookingByIdOrThrow('12345');
      }).toThrow();
    });
  });
});
