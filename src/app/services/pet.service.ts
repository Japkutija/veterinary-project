import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet } from '../models/pet.model';
import { PetResponse } from '../models/response/pet-response.model';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private apiUrl = 'http://localhost:8080/api/pets'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  getPets(pageIndex: number, pageSize: number): Observable<PetResponse> {
    return this.http.get<PetResponse>(`${this.apiUrl}?pageIndex=${pageIndex}&pageSize=${pageSize}`);
  }

  // Add other methods for CRUD operations as needed


}
