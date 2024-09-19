import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export enum ModalType {
  PetEdit,
  OwnerEdit,
  // ...add more as needed
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {


  constructor() { }

  private modalSubject = new BehaviorSubject<ModalType | null>(null);

  watch() {
    return this.modalSubject.asObservable();
  }

  /**
   * Opens a modal of the specified type.
   *
   * @param modalType - The type of modal to open.
   */
  open(modalType: ModalType): void {
    this.modalSubject.next(modalType);
  }

  close(): void {
    this.modalSubject.next(null);
  }
}
