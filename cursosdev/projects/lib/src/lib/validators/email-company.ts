import { AbstractControl, ValidationErrors } from "@angular/forms";

const domainAllowed = ['cursosdev.com', 'pe.cursosdev.com', 'cursosdev.com.br'];

export function EmailCompanyValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null

    const domain = control.value.split('@')[1];

    if (domainAllowed.includes(domain)) return null

    return { emailCompany: { value: domain } };

}