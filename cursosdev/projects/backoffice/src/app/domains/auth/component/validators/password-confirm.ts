import { AbstractControl, ValidationErrors } from '@angular/forms';

export function PasswordAndConfirmValidator(control: AbstractControl): ValidationErrors | null {
    const ctrlPassword = control.get("password")
    const ctrlConfirm = control.get("confirm")

    if (!ctrlPassword || !ctrlConfirm) return null

    if (ctrlPassword && ctrlConfirm && ctrlPassword.value !== ctrlConfirm.value) {
        ctrlConfirm.setErrors({ passwordAndConfirm: true });
        return { passwordAndConfirm: true };
    }

    ctrlConfirm.setErrors(null);
    return null;
}