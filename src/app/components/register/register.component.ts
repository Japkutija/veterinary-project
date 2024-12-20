import { AuthService } from 'src/app/services/auth.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserRegistration } from 'src/app/models/user-registration.model';
import { UserService } from 'src/app/services/user.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { emsoValidator } from '../validators/emso.validator';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from 'src/app/services/ErrorHandlerService/error-handler.service';
import { AuthenticationResponse } from 'src/app/models/response/authentication-response.model';
import { Router } from '@angular/router';

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
    private authService: AuthService,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.registerForm = this.fb.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(6)]],
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      dateOfBirth: ['', [Validators.required, this.pastDateValidator()]],
      emso: [null, [Validators.required, emsoValidator()]],
      phoneNumber: [null, [Validators.required, Validators.minLength(9), Validators.maxLength(20)]],
      address: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(255)]],
    });
  }

  handleRegister(): void {
    if (this.registerForm.valid) {
      const userData: UserRegistration = this.registerForm.value;
      this.authService.registerUser(userData).subscribe({
        next: (response: AuthenticationResponse) => {
          // Store the access token
          localStorage.setItem('accessToken', response.jwt);

          this.authService.fetchCurrentUser();

          // Update authentication status
          this.authService.setAuthStatus(true);

          this.registerForm.reset();

          // Navigate to pet management page
          this.router.navigate(['/pet-management']);

          // Show success modal
          this.modal.success({
            nzTitle: 'Registration Successful',
            nzContent: 'You have registered and are now logged in!',
          });
        },
        error: (error: HttpErrorResponse) => {
          this.errorHandler.showErrorModal(error);
          this.errorHandler.setFormErrors(this.registerForm, error);
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
  getPasswordErrorMessage(): string {
    const passwordControl = this.registerForm.get('password');
    if (passwordControl?.hasError('required')) {
      return 'Please input your password';
    } else if (passwordControl?.hasError('minlength')) {
      return 'Password must be at least 6 characters';
    }
    return '';
  }
  getConfirmPasswordErrorMessage(): string {
    const confirmPasswordControl = this.registerForm.get('confirmPassword');
    if (confirmPasswordControl?.hasError('required')) {
      return 'Please confirm your password';
    } else if (confirmPasswordControl?.hasError('minlength')) {
      return 'Password must be at least 6 characters';
    }
    return '';
  }
  pastDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const date = new Date(control.value);
      return date > new Date() ? { futureDate: true } : null;
    };
  }

  getFirstNameErrorMessage(): string {
    const control = this.registerForm.get('firstName');
    if (!control) return '';

    if (control.hasError('required')) {
      return 'First name is required';
    }
    if (control.hasError('minlength')) {
      return 'First name must be at least 2 characters';
    }
    if (control.hasError('maxlength')) {
      return 'First name cannot exceed 50 characters';
    }
    return '';
  }

  getLastNameErrorMessage(): string {
    const control = this.registerForm.get('lastName');
    if (!control) return '';

    if (control.hasError('required')) {
      return 'Last name is required';
    }
    if (control.hasError('minlength')) {
      return 'Last name must be at least 2 characters';
    }
    if (control.hasError('maxlength')) {
      return 'Last name cannot exceed 50 characters';
    }
    return '';
  }

  getDateOfBirthErrorMessage(): string {
    const control = this.registerForm.get('dateOfBirth');
    if (!control) return '';

    if (control.hasError('required')) {
      return 'Date of birth is required';
    }
    if (control.hasError('futureDate')) {
      return 'Date of birth cannot be in the future';
    }
    return '';
  }
  getUsernameErrorMessage(): string {
    const control = this.registerForm.get('username');
    if (!control) return '';

    if (control.hasError('required')) {
      return 'Username is required';
    }
    return '';
  }
}
