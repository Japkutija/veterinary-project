import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {


  constructor() { }

  private display: BehaviorSubject<'open' | 'close'> = new BehaviorSubject<'open' | 'close'>('close');

  /**
   * Returns an Observable that emits either 'open' or 'close' when the modal is displayed or closed.
   * @returns An Observable that emits either 'open' or 'close'.
   */
  watch(): Observable<'open' | 'close'> {
    return this.display.asObservable();
  }

  open(): void {
    this.display.next('open');
  }

  close(): void {
    this.display.next('close');
  }
}
