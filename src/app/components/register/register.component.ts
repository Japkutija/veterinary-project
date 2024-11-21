import { AuthService } from 'src/app/services/auth.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRegistration } from 'src/app/models/user-registration.model';
import { UserService } from 'src/app/services/user.service';
import { NzModalService } from 'ng-zorro-antd/modal';

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
      emso: [null, [Validators.required]],
    });
  }

  handleRegister(): void {
    if (this.registerForm.valid) {
      const userData: UserRegistration = this.registerForm.value;
      this.authService.registerUser(userData).subscribe({
        next: () => {
          this.modal.success({
            nzTitle: 'Registration Successful',
            nzContent: 'You have registered successfully!',
          });
          this.registerForm.reset();
        },
        error: (err: any) => {
          this.modal.error({
            nzTitle: 'Registration Failed',
            nzContent: err.error.message || 'An unexpected error occurred.',
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
}
