import { Booking, Category, Facility, Notification, Review, Venue } from "@prisma/client";

export type VenueType = {
  id?: string;
  name: string;
  price: number;
  description: string;
  location: string;
  city: string;
  longitude?: number | null;
  latitude?: number | null;
  guestCapacity: number | string;
  categoryId: string;
  userId: string;
  imagesUrl?: string[];
  createdAt?: Date;
  category: Category;
  isVerified: boolean;
  facilities?: Facility[] | any;
};

export interface IVenue {
  venues: VenueType[];
  venue: VenueType | null;
  loading: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMessage: string;
}
