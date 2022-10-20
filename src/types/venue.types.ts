import { Booking, Facility, Notification, Review, Venue } from "@prisma/client";

export type VenueType = {
  id?: string;
  name: string;
  price: number | string;
  description: string;
  location: string;
  city: string;
  longitude?: number | string;
  latitude?: number | string;
  guestCapacity: number | string;
  categoryId: string;
  userId: string;
  imagesUrl?: string[];
  isVerified: boolean;
  facilities?: Facility[];
};

export interface IVenue {
  venues: VenueType[];
  venue: Venue | null;
  loading: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMessage: string;
}
