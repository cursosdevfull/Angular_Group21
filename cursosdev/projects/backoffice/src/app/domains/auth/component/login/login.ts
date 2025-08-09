import { Component, effect, inject, Injector, runInInjectionContext } from '@angular/core';
import { LayoutService } from '../../../../shared/modules/layout/layout.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailCompanyValidator } from '../../../../../../../lib/src/lib/validators/email-company';
import { EmailCompanyCustomValidator } from '../../../../../../../lib/src/lib/validators/email-custom';
import { PasswordAndConfirmValidator } from '../validators/password-confirm';
import { AuthService } from '../../services/auth.service';
import { Auth } from '../../models/auth.model';

@Component({
  selector: 'cdev-login',
  imports: [MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  providers: [AuthService]
})
export class Login {
  private readonly layoutService = inject(LayoutService);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  fg!: FormGroup

  constructor(private injector: Injector) {
    this.loadForm()

    this.layoutService.changeConfigLayout({
      header: false,
      menu: false
    });
  }

  loadForm() {
    this.fg = new FormGroup({
      email: new FormControl(null,
        [
          Validators.required,
          Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
          //EmailCompanyValidator,
          EmailCompanyCustomValidator("cursosdev.com", "pe.cursosdev.com", "cursosdev.com.br")
        ]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
      //confirm: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
    },/*  [PasswordAndConfirmValidator] */);
  }

  onLogin() {
    if (this.fg.valid) {
      const { email, password } = this.fg.value;

      runInInjectionContext(this.injector, () => {
        const auth = this.authService.login(new Auth(email, password));

        effect(() => {
          const tokens = auth();
          console.log('Tokens:', tokens);

          if (tokens) {
            sessionStorage.setItem('accessToken', tokens.accessToken);
            sessionStorage.setItem('refreshToken', tokens.refreshToken);
            this.router.navigate(['/courses']);
          }
        })
      });



    }
  }
}
