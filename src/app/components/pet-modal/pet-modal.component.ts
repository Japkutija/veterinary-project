import { AuthService } from './../../services/auth.service';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Breed } from 'src/app/models/breed.model';
import { Owner } from 'src/app/models/owner.model';
import { Pet } from 'src/app/models/pet.model';
import { Species } from 'src/app/models/species.model';
import { User } from 'src/app/models/user.model';
import { BreedService } from 'src/app/services/breed.service';
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
    private userService: UserService
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
          console.log('User profile:', user);
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
    });

    // Listen to speciesUuid changes to fetch breeds
    this.petForm.get('speciesUuid')?.valueChanges.subscribe((speciesUuid) => {
      this.onSpeciesChange(speciesUuid);
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
      },
      (error) => {
        console.error('Error fetching breeds:', error);
      }
    );
  }
}
