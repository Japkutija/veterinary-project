import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet } from '../models/pet.model';
import { PetResponse } from '../models/response/pet-response.model';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private apiUrl = 'http://localhost:8080/api/pets';

  constructor(private http: HttpClient) {}

  getPets(pageIndex: number, pageSize: number, sortField: string, sortOrder: string): Observable<PetResponse> {
    return this.http.get<PetResponse>(
      `${this.apiUrl}?pageIndex=${pageIndex}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}`,
      { withCredentials: true }
    );
  }

  updatePets(pet: Pet): Observable<Pet> {
    return this.http.put<Pet>(`${this.apiUrl}/${pet.uuid}`, pet, { withCredentials: true });
  }

  // Add other methods for CRUD operations as needed
  deletePet(petUuid: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${petUuid}`, { withCredentials: true });
  }
}
