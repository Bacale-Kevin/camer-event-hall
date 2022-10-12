import { Facility } from "@prisma/client";

export interface IFacility {
  loading: boolean;
  facilities: Facility[];
  facility: Facility | null;
  isError: boolean;
  isSuccess: boolean;
  errorMessage: string;
  successMessage: string;
}
