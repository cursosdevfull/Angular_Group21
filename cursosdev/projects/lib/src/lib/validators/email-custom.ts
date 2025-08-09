import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function EmailCompanyCustomValidator(...domainAllowed: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) return null

        const domain = control.value.split('@')[1];

        if (domainAllowed.includes(domain)) return null

        return { emailCompany: { value: domain } };
    }
}