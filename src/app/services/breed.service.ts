import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Breed } from '../models/breed.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreedService {

  private apiUrl = 'http://localhost:8080/api/breeds';
  constructor(private http: HttpClient) { }


  getBreeds(): Observable<Breed[]> {
    return this.http.get<Breed[]>(`${this.apiUrl}`, { withCredentials: true });
  }

  getBreedsBySpeciesUuid(speciesUuid: string): Observable<Breed[]> {
    return this.http.get<Breed[]>(`${this.apiUrl}/species/uuid/${speciesUuid}`, { withCredentials: true });
  }
  getBreedsBySpeciesName(speciesName: string): Observable<Breed[]> {
    return this.http.get<Breed[]>(`${this.apiUrl}/species/name/${speciesName}`, { withCredentials: true });
  }
}
