import { Pet } from "../pet.model";

export interface PetResponse {
  content: Pet[];
  totalElements: number;
  totalPages: number;
  pageIndex: number;
  pageSize: number;
}
