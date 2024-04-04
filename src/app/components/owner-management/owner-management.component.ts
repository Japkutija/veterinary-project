import { ModalService } from './../../services/modal.service';
import { Component } from '@angular/core';
import { ModalType } from 'src/app/services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-management',
  templateUrl: './owner-management.component.html',
  styleUrls: ['./owner-management.component.css']
})
export class OwnerManagementComponent {

  ModalType = ModalType;
  owner: any;

  constructor(public modalService: ModalService, private router: Router){}

  openEditOwnerModal(): void {
    this.modalService.open(ModalType.OwnerEdit);
  }

  viewOwnerPets(ownerId: number): void {
    this.router.navigate(['/owner-management', ownerId, 'pets']);
  }

}
