import { ModalService } from './../../../services/modal.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-owner-edit',
  templateUrl: './owner-edit.component.html',
  styleUrls: ['./owner-edit.component.css']
})
export class OwnerEditComponent {

  constructor(public modalService: ModalService) { }
  closeModal(): void {
    this.modalService.close();
  }
}
