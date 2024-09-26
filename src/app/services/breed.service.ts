import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Breed } from '../models/breed.model';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorHandlerService } from './ErrorHandlerService/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class BreedService {

  private apiUrl = 'http://localhost:8080/api/breeds';
  constructor(private http: HttpClient, private errorHandler: ErrorHandlerService) { }


  getBreeds(): Observable<Breed[]> {
    return this.http.get<Breed[]>(`${this.apiUrl}`, { withCredentials: true });
  }

  getBreedsBySpeciesUuid(speciesUuid: string): Observable<Breed[]> {
    return this.http.get<Breed[]>(`${this.apiUrl}/species/uuid/${speciesUuid}`, { withCredentials: true }).pipe(
      catchError((error: any) => {
        console.error('Error fetching breeds:', error);
        return throwError('Failed to fetch breeds.');
      })
    );
  }
  getBreedsBySpeciesName(speciesName: string): Observable<Breed[]> {
    return this.http.get<Breed[]>(`${this.apiUrl}/species/name/${speciesName}`, { withCredentials: true });
  }
}
