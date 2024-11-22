import { Component, OnInit } from '@angular/core';
import { Menu } from '../Model/menu.model';
import { MenuService } from '../Service/menu.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        FooterComponent
    ]
})
export class MenuComponent implements OnInit {
  menus: Menu[] = [];
  menu: Menu = {
    idMenu: 0,
    nombre: '',
    descripcion: '',
    precio: 0
  };

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.listarMenus();
  }

  listarMenus(): void {
    this.menuService.listarMenus().subscribe({
      next: (data) => {
        this.menus = data;
      },
      error: (error) => {
        console.error('Error al listar menús:', error);
      },
      complete: () => {
        console.log('Listado de menús completado.');
      }
    });
  }

  guardarMenu(): void {
    if (this.menu.idMenu) {
      // Actualizar menú existente
      this.menuService.actualizarMenu(this.menu.idMenu, this.menu).subscribe({
        next: () => {
          this.listarMenus();
          this.cancelarEdicion();
        },
        error: (error) => {
          console.error('Error al actualizar menú:', error);
        },
        complete: () => {
          console.log('Actualización de menú completada.');
        }
      });
    } else {
      // Crear nuevo menú
      this.menuService.crearMenu(this.menu).subscribe({
        next: () => {
          this.listarMenus();
          this.menu = {
            idMenu: 0,
            nombre: '',
            descripcion: '',
            precio: 0
          };
        },
        error: (error) => {
          console.error('Error al crear menú:', error);
        },
        complete: () => {
          console.log('Creación de menú completada.');
        }
      });
    }
  }

  editarMenu(m: Menu): void {
    this.menu = { ...m }; // Copiar el menú seleccionado
  }

  eliminarMenu(idMenu: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este menú?')) {
      this.menuService.eliminarMenu(idMenu).subscribe({
        next: () => {
          this.listarMenus();
        },
        error: (error) => {
          console.error('Error al eliminar menú:', error);
        },
        complete: () => {
          console.log('Eliminación de menú completada.');
        }
      });
    }
  }

  cancelarEdicion(): void {
    this.menu = {
      idMenu: 0,
      nombre: '',
      descripcion: '',
      precio: 0
    };
  }
}
