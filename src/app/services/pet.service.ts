import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet } from '../models/pet.model';
import { PetResponse } from '../models/response/pet-response.model';
import { environment } from 'src/environments/environment';
import { PaginatedResponse } from '../models/paginated-response';
@Injectable({
  providedIn: 'root',
})
export class PetService {
  private apiUrl = `${environment.apiUrl}/pets`;

  constructor(private http: HttpClient) {}

  getPets(
    pageIndex: number,
    pageSize: number,
    sortField: string,
    sortOrder: string,
    searchValue?: string
  ): Observable<PaginatedResponse<Pet>> {

    let params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString())
      .set('sortField', sortField)
      .set('sortOrder', sortOrder);

    // if (searchValue) {
    //   params = params.set('search', searchValue);
    // }

    return this.http.get<PaginatedResponse<Pet>>(this.apiUrl, {
      params,
      withCredentials: true,
    });
  }

  getPetByUuid(petUuid: string): Observable<Pet> {
    return this.http.get<Pet>(`${this.apiUrl}/${petUuid}`, { withCredentials: true });
  }

  createPet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.apiUrl, pet, { withCredentials: true });
  }

  updatePet(petUuid: string, pet: Pet): Observable<Pet> {
    return this.http.put<Pet>(`${this.apiUrl}/${petUuid}`, pet, { withCredentials: true });
  }

  deletePet(petUuid: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${petUuid}`, { withCredentials: true });
  }
}
