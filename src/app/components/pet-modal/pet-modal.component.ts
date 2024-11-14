import { AuthService } from './../../services/auth.service';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Breed } from 'src/app/models/breed.model';
import { Owner } from 'src/app/models/owner.model';
import { PaginatedResponse } from 'src/app/models/paginated-response';
import { Pet } from 'src/app/models/pet.model';
import { Species } from 'src/app/models/species.model';
import { User } from 'src/app/models/user.model';
import { BreedService } from 'src/app/services/breed.service';
import { OwnerService } from 'src/app/services/owner.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pet-modal',
  templateUrl: './pet-modal.component.html',
  styleUrls: ['./pet-modal.component.css'],
})
export class PetModalComponent implements OnInit {
  @Input() isVisible = false;
  @Input() petData?: Pet;
  @Input() speciesList: Species[] = [];
  @Input() ownerList: Owner[] = [];
  @Input() breedList: Breed[] = [];
  @Output() onSave = new EventEmitter<Pet>();
  @Output() onCancel = new EventEmitter<void>();
  @Output() onSpeciesChanged = new EventEmitter<string>();

  petForm!: FormGroup;
  currentUser: User | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private breedService: BreedService,
    private userService: UserService,
    private ownerService: OwnerService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.initializeUser();
  }

  initializeUser(): void {
    this.userService.getCurrentUser().subscribe(
      (user: User | null) => {
        if (!user) {
          this.userService.fetchAndUpdateUserProfile();
        } else {
          this.currentUser = user;
          this.petForm.addControl('ownerUuid', this.fb.control(user.uuid, [Validators.required]));
          console.log('User profile:', user);

          // Load owners if the current user is an ADMIN
          if (this.currentUser?.role === 'USER') {
            this.loadOwners();
          }
        }
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }
  ngOnChanges(): void {
    if (this.isVisible && this.petForm) {
      this.populateForm();
    }
  }
  ngOnDestroy(): void {}

  createForm(): void {
    this.petForm = this.fb.group({
      nickname: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      dateOfBirth: [null, [Validators.required]],
      weight: [null, [Validators.required, Validators.min(0)]],
      height: [null, [Validators.required, Validators.min(0)]],
      speciesUuid: [null, [Validators.required]],
      breedUuid: [null, [Validators.required]],
      speciesName: [null],
    });

    // Listen to speciesUuid changes to fetch breeds
    this.petForm.get('speciesUuid')?.valueChanges.subscribe((speciesUuid) => {
      this.onSpeciesChange(speciesUuid);
      const selectedSpecies = this.speciesList.find((species) => species.uuid === speciesUuid);
      this.petForm.patchValue({ speciesName: selectedSpecies ? selectedSpecies.name : null }); // Update speciesName
    });
  }

  populateForm(): void {
    if (this.petData) {
      this.petForm.patchValue(this.petData);
      // Load breeds for the selected species
      // Assume you have a method to load breeds
      this.loadBreeds(this.petData.speciesUuid);
    } else {
      if (this.currentUser?.role === 'ADMIN') {
        this.petForm.addControl('ownerUuid', this.fb.control(this.currentUser.uuid, [Validators.required]));
      } else {
        this.petForm.patchValue({ ownerUuid: this.currentUser?.uuid });
        // Ensure ownerUuid is set to current user's UUID on the backend
      }
      this.breedList = [];
    }
  }

  handleOk(): void {
    if (this.petForm.valid) {
      console.log('Pet form data:', this.petForm.value);
      this.onSave.emit(this.petForm.value);
    } else {
      this.markFormFieldsAsDirty();
    }
  }

  handleCancel(): void {
    this.petForm.reset();
    this.onCancel.emit();
  }

  markFormFieldsAsDirty(): void {
    Object.values(this.petForm.controls).forEach((control) => {
      control.markAsDirty();
      control.updateValueAndValidity();
    });
  }

  onSpeciesChange(speciesUuid: string): void {
    this.petForm.patchValue({ breedUuid: null });
    if (speciesUuid) {
      this.loadBreeds(speciesUuid);
    } else {
      this.breedList = [];
    }
  }

  loadBreeds(speciesUuid: string): void {
    this.onSpeciesChanged.emit(speciesUuid);
    this.breedService.getBreedsBySpeciesUuid(speciesUuid).subscribe(
      (breeds) => {
        this.breedList = breeds;
        console.log('Breeds:', breeds);
        const selectedBreed = this.petForm.get('breedUuid')?.value;
        const breed = this.breedList.find((b) => b.uuid === selectedBreed);
        this.petForm.patchValue({ breedName: breed ? breed.name : null }); // Update breedName if applicable
        console.log("Checking whether the uuids match: ", selectedBreed, breed?.uuid);
        console.log("Sending the following breed name: ", breed?.name);
      },
      (error) => {
        console.error('Error fetching breeds:', error);
        this.breedList = [];
      }
    );
  }
  loadOwners(): void {
    this.ownerService.getOwners(1, 1000, 'id', 'asc').subscribe(
      (owners: PaginatedResponse<Owner>) => {
        this.ownerList = owners.content;
      },
      (error) => {
        console.error('Error fetching owners:', error);
      }
    );
  }
  formatOwnerLabel(owner: Owner): string {
    return `${owner.firstName} ${owner.lastName} (${owner.email})`;
  }
}
