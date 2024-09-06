import { Pet } from 'src/app/models/pet.model';
import { ModalService } from './../../services/modal.service';
import { Component } from '@angular/core';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-pet-management',
  templateUrl: './pet-management.component.html',
  styleUrls: ['./pet-management.component.css']
})
export class PetManagementComponent {

  petList: Pet[] = [];
  loading: boolean = false;
  total: number = 0;
  pageIndex: number = 1;
  pageSize: number = 10;

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    this.loadPets();
  }

  loadPets(): void {
    this.loading = true;
    this.petService.getPets(this.pageIndex, this.pageSize).subscribe(data => {
      this.petList = data.pets;
      this.total = data.total;
      this.loading = false;
    });
  }

  onPageIndexChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.loadPets();
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.loadPets();
  }

  onQueryParamsChange(params: any): void {
    const { pageIndex, pageSize } = params;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.loadPets();
  }

  openEditModal(pet?: Pet): void {
    // Implement open edit modal functionality
  }

  editPet(pet?: Pet): void {
    // Implement edit pet functionality
  }

  deletePet(pet?: Pet): void {
    // Implement delete pet functionality
  }

}
