import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Owner } from 'src/app/models/owner.model';
import { AuthService } from 'src/app/services/auth.service';
import { OwnerService } from 'src/app/services/owner.service';

@Component({
  selector: 'app-owner-edit',
  templateUrl: './owner-edit.component.html',
  styleUrls: ['./owner-edit.component.css'],
})
export class OwnerEditComponent {
  @Input() owner!: Owner;
  ownerForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private ownerService: OwnerService,
    private modalRef: NzModalRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.ownerForm = this.fb.group({
      firstName: [this.owner.firstName, [Validators.required, Validators.maxLength(50)]],
      lastName: [this.owner.lastName, [Validators.required, Validators.maxLength(50)]],
      email: [this.owner.email, [Validators.email]],
      phoneNumber: [this.owner.phoneNumber],
      address: [this.owner.address],
      emso: [{ value: this.owner.emso, disabled: true }, [Validators.minLength(13), Validators.maxLength(13)]],
      dateOfBirth: [{ value: this.owner.dateOfBirth ? new Date(this.owner.dateOfBirth) : null, disabled: true }],
    });

    // // Check user role
    // const userRole = this.authService.getUserRole();
    // this.canEditSensitive = userRole === 'ADMIN';

    // if (!this.canEditSensitive) {
    //   this.ownerForm.get('emso')?.disable();
    //   this.ownerForm.get('dateOfBirth')?.disable();
    // }
  }

  submitForm(): void {
    if (this.ownerForm.valid) {
      const { emso } = this.ownerForm.value;
      this.isLoading = true;
      const updatedOwner = { ...this.owner, ...this.ownerForm.value };
      this.ownerService.updateOwner(this.owner.uuid, updatedOwner).subscribe({
        next: () => {
          this.isLoading = false;
          this.modalRef.close('Success');
        },
        error: (err: any) => {
          console.error('Failed to update owner:', err);
          this.isLoading = false;
        },
      });
    } else {
      // Mark all controls as dirty to trigger validation messages
      for (const i in this.ownerForm.controls) {
        if (this.ownerForm.controls.hasOwnProperty(i)) {
          this.ownerForm.controls[i].markAsDirty();
          this.ownerForm.controls[i].updateValueAndValidity();
        }
      }
    }
  }

  cancel(): void {
    this.modalRef.close();
  }
}
