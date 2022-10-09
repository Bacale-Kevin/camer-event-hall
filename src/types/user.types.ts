import { Booking, Notification, Review, Venue } from "@prisma/client";

export interface IUser {
  name: string;
  email: string;
  profilePicUrl: string;
  role: string;
  reviews: Review[];
  venues: Venue[];
  notifications: Notification[];
  bookings: Booking[];
}


export type signUpFormInputs = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type loginFormInputs = {
  email: string;
  password: string;
};