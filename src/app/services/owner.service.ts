import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Owner } from '../models/owner.model';
import { environment } from 'src/environments/environment';
import { PaginatedResponse } from '../models/paginated-response';

@Injectable({
  providedIn: 'root',
})
export class OwnerService {
  private apiUrl = `${environment.apiUrl}/owners`;

  constructor(private http: HttpClient) {}

  getOwners(
    pageIndex: number,
    pageSize: number,
    sortField: string,
    sortOrder: string,
    searchValue?: string
  ): Observable<PaginatedResponse<Owner>> {
    let params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString())
      .set('sortField', sortField)
      .set('sort', sortField);

    // if (searchValue) {
    //   params = params.set('search', searchValue);
    // }

    return this.http.get<PaginatedResponse<Owner>>(this.apiUrl, {
      params,
      withCredentials: true,
    });
  }

  getOwnerByUuid(ownerUuid: string): Observable<Owner> {
    return this.http.get<Owner>(`${this.apiUrl}/${ownerUuid}`, { withCredentials: true });
  }

  createOwner(owner: Owner): Observable<Owner> {
    return this.http.post<Owner>(`${this.apiUrl}`, owner, { withCredentials: true });
  }

  updateOwner(ownerUuid: string, owner: Owner): Observable<Owner> {
    return this.http.put<Owner>(`${this.apiUrl}/${ownerUuid}`, owner, { withCredentials: true });
  }

  deleteOwner(ownerUuid: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${ownerUuid}`, { withCredentials: true });
  }
}
