import { AbstractControl, ValidationErrors } from '@angular/forms';

const PHONE_REGEXP = /^[(]{0,1}[0-9]{3}[)\.\- ]{0,1}[0-9]{3}[\.\- ]{0,1}[0-9]{4}$/;

export function ValidatePhone(control: AbstractControl): ValidationErrors | null {
  return PHONE_REGEXP.test(control.value) ? null : { invalidPhone: true };
}
