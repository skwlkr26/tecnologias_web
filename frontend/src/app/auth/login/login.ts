import { Component } from '@angular/core';
import { Auth } from '../auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  username = '';
  password = '';
  error = '';
  loading = false;

  constructor(private auth: Auth, private router: Router) {}

  login() {
    this.error = '';
    this.loading = true;
    this.auth.login(this.username, this.password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/list']); // Redirige al inicio/lista tras login
      },
      error: err => {
        this.loading = false;
        this.error = err.error?.message || 'Credenciales incorrectas';
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
