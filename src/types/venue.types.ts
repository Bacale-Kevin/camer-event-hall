import { Booking, Facility, Notification, Review, Venue } from "@prisma/client";

export interface IVenue {
  loading: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMessage: string;
  venues?: Venue[];
  venue: Venue | null;
  reviews?: Review[];
  notification?: Notification[];
  bookings?: Booking[];
  facilities?: Facility[];
}
