import { AbstractControl, ValidatorFn } from '@angular/forms';

/*
 *
 * Validator function to validate an EMSO (Unique Master Citizen Number).
 *
 * @returns {ValidatorFn} A function that takes an AbstractControl and returns
 * an object with validation errors or null if the EMSO is valid.
 *
 * The EMSO is considered valid if:
 * - It is not empty.
 * - It is exactly 13 digits long.
 * - It contains only numeric characters.
 *
 * Validation errors returned:
 * - { required: true } if the EMSO is empty.
 * - { invalidLength: true } if the EMSO is not 13 digits long.
 * - { invalidFormat: true } if the EMSO contains non-numeric characters.
 */
export function emsoValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const emso = control.value;

    // Check if the EMSO is empty
    if (!emso) {
      return { required: true };
    }

    // Check if the EMSO is exactly 13 digits
    if (emso.length !== 13) {
      return { invalidLength: true };
    }

    // Check if the EMSO contains only numbers
    if (!/^\d+$/.test(emso)) {
      return { invalidFormat: true };
    }

    // If all checks pass, return null (valid)
    return null;
  };
}
