import { Component, inject } from '@angular/core';
import { LayoutService } from '../../../../shared/modules/layout/layout.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'cdev-login',
  imports: [MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private readonly layoutService = inject(LayoutService);
  private readonly router = inject(Router);

  fg!: FormGroup

  constructor() {
    this.loadForm()

    this.layoutService.changeConfigLayout({
      header: false,
      menu: false
    });
  }

  loadForm() {
    this.fg = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)])
    })
  }

  onLogin() {
    console.log(this.fg);
    /*if (this.fg.valid) {
      this.router.navigate(['/courses']);
    }*/
  }
}
