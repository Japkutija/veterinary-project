import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Species } from '../models/species.model';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {

  private apiUrl = 'http://localhost:8080/api/species';
  constructor(private http: HttpClient) { }



  getSpecies(): Observable<Species[]> {
    return this.http.get<Species[]>(`${this.apiUrl}`, { withCredentials: true });
  }
}
