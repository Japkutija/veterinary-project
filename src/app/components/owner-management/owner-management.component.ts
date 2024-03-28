import { ModalService } from './../../services/modal.service';
import { Component } from '@angular/core';
import { ModalType } from 'src/app/services/modal.service';

@Component({
  selector: 'app-owner-management',
  templateUrl: './owner-management.component.html',
  styleUrls: ['./owner-management.component.css']
})
export class OwnerManagementComponent {

  ModalType = ModalType;

  constructor(public modalService: ModalService){}

  openEditOwnerModal(): void {
    this.modalService.open(ModalType.OwnerEdit);
  }

}
