import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ApiErrorResponse, FieldError, ValidationErrorResponse } from '../../models/response/error-response.model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private modal: NzModalService) {}

  // Show error modal with appropriate message
  showErrorModal(error: HttpErrorResponse): void {
    // Check if it's a validation error
    if (error.error?.fieldErrors) {
      const validationError = error.error as ValidationErrorResponse;
      this.showValidationError(validationError);
    } else {
      const apiError = error.error as ApiErrorResponse;
      this.showBasicError(apiError);
    }
  }

  private showBasicError(error: ApiErrorResponse): void {
    this.modal.error({
      nzTitle: error.error || 'Error',
      nzContent: error.message || 'An unexpected error occurred',
    });
  }

  private showValidationError(error: ValidationErrorResponse): void {
    // Create a message that includes field errors
    const fieldErrorMessages = error.fieldErrors.map((err) => `${err.field}: ${err.message}`).join('\n');

    this.modal.error({
      nzTitle: error.error || 'Validation Error',
      nzContent: `${error.message}\n\n${fieldErrorMessages}`,
    });
  }

  // Helper method to get field-specific error message
  getFieldErrorMessage(error: HttpErrorResponse, fieldName: string): string | null {
    if (error.error?.fieldErrors) {
      const fieldError = error.error.fieldErrors.find((err: FieldError) => err.field === fieldName);
      return fieldError?.message || null;
    }
    return null;
  }
  setFormErrors(form: FormGroup, error: HttpErrorResponse): void {
    if (error.error?.fieldErrors) {
      error.error.fieldErrors.forEach((fieldError: FieldError) => {
        const control = form.get(fieldError.field);
        if (control) {
          control.setErrors({ serverError: fieldError.message });
        }
      });
    }
  }
}
