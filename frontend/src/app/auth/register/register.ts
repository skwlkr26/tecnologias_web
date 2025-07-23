import { Component } from '@angular/core';
import { Auth } from '../auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  username = '';
  password = '';
  role = 'user';
  error = '';
  loading = false;

  constructor(private auth: Auth, private router: Router) {}

  register() {
    this.error = '';
    this.loading = true;
    this.auth.register(this.username, this.password, this.role).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/login']);
      },
      error: err => {
        this.loading = false;
        this.error = err.error?.message || 'Error al registrar';
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
