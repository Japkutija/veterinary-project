import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Breed } from 'src/app/models/breed.model';
import { Owner } from 'src/app/models/owner.model';
import { Pet } from 'src/app/models/pet.model';
import { Species } from 'src/app/models/species.model';

@Component({
  selector: 'app-pet-modal',
  templateUrl: './pet-modal.component.html',
  styleUrls: ['./pet-modal.component.css'],
})
export class PetModalComponent {
  @Input() isVisible = false;
  @Input() petData?: Pet;
  @Input() speciesList: Species[] = [];
  @Input() ownerList: Owner[] = [];
  @Output() onSave = new EventEmitter<Pet>();
  @Output() onCancel = new EventEmitter<void>();
  @Output() onSpeciesChanged = new EventEmitter<string>();

  petForm!: FormGroup;
  @Input() breedList: Breed[] = [];

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  ngOnChanges(): void {
    if (this.isVisible) {
      this.populateForm();
    }
  }

  createForm(): void {
    this.petForm = this.fb.group({
      nickname: [null, [Validators.required]],
      ownerUuid: [null, [Validators.required]],
      speciesUuid: [null, [Validators.required]],
      breedUuid: [null, [Validators.required]],
    });
  }

  populateForm(): void {
    if (this.petData) {
      this.petForm.patchValue(this.petData);
      // Load breeds for the selected species
      // Assume you have a method to load breeds
      this.loadBreeds(this.petData.speciesUuid);
    } else {
      // this.petForm.reset();
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
    // Implement breed loading logic, possibly by emitting an event to the parent
  }
}
