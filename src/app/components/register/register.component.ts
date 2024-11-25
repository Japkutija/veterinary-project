import { AuthService } from 'src/app/services/auth.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRegistration } from 'src/app/models/user-registration.model';
import { UserService } from 'src/app/services/user.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { emsoValidator } from '../validators/emso.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  @Input() isRegisterFormVisible: boolean = false;
  @Output() onCancel = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private modal: NzModalService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.registerForm = this.fb.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      dateOfBirth: [null, [Validators.required]],
      emso: [null, [Validators.required, emsoValidator()]],
      phoneNumber: [null, [Validators.required, Validators.minLength(9), Validators.maxLength(20)]],
      address: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(255)]]
    });
  }

  handleRegister(): void {
    if (this.registerForm.valid) {
      const userData: UserRegistration = this.registerForm.value;
      this.authService.registerUser(userData).subscribe({
        next: (response) => {
          this.authService.login(userData.email, userData.password).subscribe({
            next: () => {
              this.modal.success({
                nzTitle: 'Registration Successful',
                nzContent: 'You have registered and are now logged in!',
              });
              this.registerForm.reset();
            },
            error: (err) => {
              this.modal.error({
                nzTitle: 'Login Failed',
                nzContent: err.error.message || 'An unexpected error occurred during login.',
              });
            },
          });
        },
        error: (err) => {
          this.modal.error({
            nzTitle: 'Registration Failed',
            nzContent: err.error.message || 'An unexpected error occurred during registration.',
          });
        },
      });
    } else {
      this.markFormFieldsAsDirty();
    }
  }

  handleCancel(): void {
    this.registerForm.reset();
    this.onCancel.emit();
  }

  markFormFieldsAsDirty(): void {
    Object.values(this.registerForm.controls).forEach((control) => {
      control.markAsDirty();
      control.updateValueAndValidity();
    });
  }
  /*
 * Retrieves the error message for the EMSO field based on its validation state.
 *
 * @returns {string} The appropriate error message if the EMSO field has a validation error,
 *                   or an empty string if there are no errors.
 */
  getEmsoErrorMessage(): string {
    const emsoControl = this.registerForm.get('emso');
    if (emsoControl?.hasError('required')) {
      return 'Please input your EMSO';
    } else if (emsoControl?.hasError('invalidLength')) {
      return 'EMSO must be exactly 13 digits';
    } else if (emsoControl?.hasError('invalidFormat')) {
      return 'EMSO must contain only numbers';
    }
    return '';
  }

  getPhoneNumberErrorMessage(): string {
    const phoneControl = this.registerForm.get('phoneNumber');
    if (phoneControl?.hasError('required')) {
      return 'Please input your phone number';
    } else if (phoneControl?.hasError('minlength')) {
      return 'Phone number must be at least 9 characters';
    } else if (phoneControl?.hasError('maxlength')) {
      return 'Phone number cannot exceed 20 characters';
    }
    return '';
  }

  getAddressErrorMessage(): string {
    const addressControl = this.registerForm.get('address');
    if (addressControl?.hasError('required')) {
      return 'Please input your address';
    } else if (addressControl?.hasError('minlength')) {
      return 'Address must be at least 10 characters';
    } else if (addressControl?.hasError('maxlength')) {
      return 'Address cannot exceed 255 characters';
    }
    return '';
  }
}
