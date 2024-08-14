import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {


  constructor() { }

  private displayPetDetails: BehaviorSubject<'open' | 'close'> = new BehaviorSubject<'open' | 'close'>('close');

  /**
   * Returns an Observable that emits either 'open' or 'close' when the modal is displayPetDetailsed or closed.
   * @returns An Observable that emits either 'open' or 'close'.
   */
  watch(): Observable<'open' | 'close'> {
    return this.displayPetDetails.asObservable();
  }

  open(): void {
    this.displayPetDetails.next('open');
  }

  close(): void {
    this.displayPetDetails.next('close');
  }
}
