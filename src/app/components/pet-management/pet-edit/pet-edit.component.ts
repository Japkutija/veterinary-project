import { ModalService } from './../../../services/modal.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pet-edit',
  templateUrl: './pet-edit.component.html',
  styleUrls: ['./pet-edit.component.css']
})
export class PetEditComponent {

  isVisible = false;

  constructor(private modalService: ModalService) {
  }

  closeModal() {
    this.modalService.close();
  }

}
