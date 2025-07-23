import { Component } from '@angular/core';
import { Crud, Item } from '../crud';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../../auth/auth';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.html',
  styleUrl: './list.scss'
})
export class List {
  items: Item[] = [];
  error = '';
  loading = false;

  isAdmin = false;

  constructor(private crud: Crud, private router: Router, private auth: Auth) {
    this.isAdmin = this.auth.getRole() === 'admin';
    this.loadItems();
  }

  loadItems() {
    this.loading = true;
    this.crud.getAll().subscribe({
      next: data => {
        this.items = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los ítems';
        this.loading = false;
      }
    });
  }

  editItem(id: number) {
    this.router.navigate(['/edit', id]);
  }

  deleteItem(id: number) {
    if (confirm('¿Seguro que deseas eliminar este ítem?')) {
      this.crud.delete(id).subscribe({
        next: () => this.loadItems(),
        error: () => this.error = 'No se pudo eliminar el ítem'
      });
    }
  }

  goToCreate() {
    this.router.navigate(['/create']);
  }
}
