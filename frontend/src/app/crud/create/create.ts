
import { Component } from '@angular/core';
import { Crud } from '../crud';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../auth/auth';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create.html',
  styleUrl: './create.scss'
})
export class Create {
  name = '';
  description = '';
  error = '';
  loading = false;
  isAdmin = false;

  constructor(private crud: Crud, private router: Router, private auth: Auth) {
    this.isAdmin = this.auth.getRole() === 'admin';
  }

  createItem() {
    this.error = '';
    this.loading = true;
    this.crud.create(this.name, this.description).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/list']);
      },
      error: err => {
        this.loading = false;
        this.error = err.error?.message || 'Error al crear el ítem';
      }
    });
  }
}
