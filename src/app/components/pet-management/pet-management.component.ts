import { ModalService, ModalType } from './../../services/modal.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pet-management',
  templateUrl: './pet-management.component.html',
  styleUrls: ['./pet-management.component.css']
})
export class PetManagementComponent {


  ModalType = ModalType;
  constructor(public modalService: ModalService){}

  openEditModal(): void {
    this.modalService.open(ModalType.PetEdit);
  }

}
