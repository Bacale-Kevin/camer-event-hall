import { Category } from "@prisma/client";

export interface ICategory {
  loading: boolean;
  categories: Category[];
  category: Category | null;
  isError: boolean;
  isSuccess: boolean;
  errorMessage: string;
  successMessage: string;
}
