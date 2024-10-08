import { Pet } from 'src/app/models/pet.model';
import { ModalService } from './../../services/modal.service';
import { Component } from '@angular/core';
import { PetService } from 'src/app/services/pet.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Species } from 'src/app/models/species.model';
import { Breed } from 'src/app/models/breed.model';
import { SpeciesService } from 'src/app/services/species.service';
import { BreedService } from 'src/app/services/breed.service';

@Component({
  selector: 'app-pet-management',
  templateUrl: './pet-management.component.html',
  styleUrls: ['./pet-management.component.css'],
})
export class PetManagementComponent {
  petList: Pet[] = [];
  speciesList: Species[] = [];
  breedLists: { [petUuid: string]: Breed[] } = {};
  selectedSpeciesUuid: string | null = null;
  selectedBreedUuid: string | null = null;
  loading: boolean = false;
  total: number = 0;
  pageIndex: number = 1;
  pageSize: number = 10;
  sortField: string = 'id';
  sortOrder: string = 'ascend';
  authSubscription!: Subscription;
  editCache: { [key: string]: { edit: boolean; data: Pet } } = {};

  constructor(
    private petService: PetService,
    private modal: NzModalService,
    private authService: AuthService,
    private router: Router,
    private speciesService: SpeciesService,
    private breedService: BreedService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService.getAuthStatus().subscribe((isAuthenticated) => {
      if (!isAuthenticated) {
        this.router.navigate(['/login']);
      } else {
        this.loadPets();
        this.loadSpecies();
      }
    });
  }

  loadSpecies(): void {
    this.speciesService.getSpecies().subscribe(
      (data: Species[]) => {
        this.speciesList = data;
      },
      (error) => {
        console.error('Error fetching species: ', error);
      }
    );
  }

  loadPets(): void {
    this.loading = true;
    this.petService.getPets(this.pageIndex, this.pageSize, this.sortField, this.sortOrder).subscribe(
      (data: any) => {
        this.petList = data.content;
        this.total = data.totalElements;
        this.loading = false;
        this.updateEditCache();
      },
      (error) => {
        console.error('Error fetching pets: ', error);
        this.loading = false;
      }
    );
  }

  updateEditCache(): void {
    this.petList.forEach((item) => {
      this.editCache[item.uuid] = {
        edit: false,
        data: { ...item },
      };
    });
  }
  startEdit(uuid: string): void {
    this.editCache[uuid].edit = true;
  }

  cancelEdit(uuid: string): void {
    const index = this.petList.findIndex((item) => item.uuid === uuid);
    this.editCache[uuid] = {
      data: { ...this.petList[index] },
      edit: false,
    };
  }

  saveEdit(uuid: string): void {
    const petData = this.editCache[uuid].data;
    console.log('Saving pet:', petData);

    // Validation: Check if species and breed are selected
    if (!petData.speciesUuid || !petData.breedUuid) {
      this.modal.error({
        nzTitle: 'Validation Error',
        nzContent: 'Please select both species and breed.',
      });
      return;
    }

    this.petService.updatePets(petData).subscribe({
      next: () => {
        console.log('Pet updated successfully');
        this.loadPets();
      },
      error: (err: any) => {
        console.error('Failed to update pet:', err);
      },
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

  onSpeciesChange(petUuid: string, speciesUuid: string) {
    // Update the pet's speciesUuid
    this.editCache[petUuid].data.speciesUuid = speciesUuid;

    // Find and set the speciesName for display purposes (optional)
    const selectedSpecies = this.speciesList.find((species) => species.uuid === speciesUuid);
    this.editCache[petUuid].data.speciesName = selectedSpecies ? selectedSpecies.name : '';

    // Reset breedUuid and breedName
    this.editCache[petUuid].data.breedUuid = '';
    this.editCache[petUuid].data.breedName = '';

    // Load breeds for the selected species
    this.loadBreedsForSpecies(speciesUuid, petUuid);
  }
  onBreedChange(petUuid: string, breedUuid: string) {
    // Update the pet's breedUuid
    this.editCache[petUuid].data.breedUuid = breedUuid;

    // Find and set the breedName for display purposes
    const selectedBreed = this.breedLists[petUuid].find((breed) => breed.uuid === breedUuid);
    this.editCache[petUuid].data.breedName = selectedBreed ? selectedBreed.name : '';
  }

  loadBreedsForSpecies(speciesUuid: string, petUuid: string) {
    this.breedService.getBreedsBySpeciesUuid(speciesUuid).subscribe(
      (data: Breed[]) => {
        this.breedLists[petUuid] = data;
        console.log('Breeds for species:', data[0].name);
      },
      (error) => {
        console.error('Error fetching breeds: ', error);
      }
    );
  }
  /**
   * Handles changes to query parameters, such as pagination and sorting.
   *
   * @param params - The query parameters object containing pagination and sorting information.
   * @param params.pageIndex - The current page index.
   * @param params.pageSize - The number of items per page.
   * @param params.sort - An array of sorting objects, each containing a key and a value indicating the sort field and order.
   *
   * The method updates the component's pagination and sorting state based on the provided parameters.
   * It then triggers the loading of pets with the updated query parameters.
   *
   * If a sort field is provided, it sets the sort field and order accordingly.
   * If no sort field is provided, it resets to the default sort field ('id') and order ('ascend').
   */
  onQueryParamsChange(params: any): void {
    const { sort } = params;
    this.pageIndex = params.pageIndex;
    this.pageSize = params.pageSize;

    const activeSort = sort.find((s: any) => s.value); //Find the last non-null sort field

    if (activeSort) {
      this.sortField = activeSort.key === 'petId' ? 'id' : activeSort.key;
      this.sortOrder = activeSort.value === 'ascend' ? 'asc' : 'desc';
    } else {
      // Resest to default sort if no sort is applied
      this.sortField = 'id';
      this.sortOrder = 'ascend';
    }
    this.loadPets();
  }

  openEditModal(pet?: Pet): void {
    // Implement open edit modal functionality
  }

  editPet(pet?: Pet): void {
    // Implement edit pet functionality
  }

  deletePet(petUuid: string): void {
    this.petService.deletePet(petUuid).subscribe({
      next: () => {
        // On success, reload the pets list
        this.loadPets();
        this.showDeletionSuccess();
      },
      error: (err: any) => {
        console.error('Failed to delete pet:', err);
        this.showDeletionError();
      },
    });
  }

  showDeleteConfirm(petUuid: string): void {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete this pet?',
      nzContent: 'Deleting this pet will remove it from the system.',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.deletePet(petUuid);
      },
      nzCancelText: 'No',
    });
  }

  showDeletionSuccess(): void {
    this.modal.success({
      nzTitle: 'Pet deleted successfully',
      nzContent: 'The pet has been successfully deleted from the system.',
    });
  }

  showDeletionError(): void {
    this.modal.error({
      nzTitle: 'Failed to delete pet',
      nzContent: 'An error occurred while deleting the pet. Please try again.',
    });
  }
}
