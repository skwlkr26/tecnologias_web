import { Component } from '@angular/core';
import { Crud, Item } from '../crud';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit.html',
  styleUrl: './edit.scss'
})
export class Edit {
  item: Item = { id: 0, name: '', description: '' };
  error = '';
  loading = false;

  constructor(
    private crud: Crud,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.crud.getById(id).subscribe({
        next: (data) => this.item = data,
        error: () => this.error = 'No se pudo cargar el ítem'
      });
    }
  }

  updateItem() {
    this.error = '';
    this.loading = true;
    this.crud.update(this.item.id, this.item.name, this.item.description).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/list']);
      },
      error: (err: any) => {
        this.loading = false;
        this.error = err.error?.message || 'Error al actualizar el ítem';
      }
    });
  }
}
