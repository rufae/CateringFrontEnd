import { Component, OnInit } from '@angular/core';
import { Empleado } from '../Model/empleado.model';
import { EmpleadoService } from '../Service/empleado.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  standalone: true,
  styleUrls: ['./empleado.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
        FooterComponent
    ]
})
export class EmpleadoComponent implements OnInit {
  empleados: Empleado[] = [];
  empleado: Empleado = {
    id: 0,
    nombre: '',
    apellido: '',
    direccion: '',
    telefono: ''
  };

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.listarEmpleados();
  }

  listarEmpleados(): void {
    this.empleadoService.listarEmpleados().subscribe({
      next: (data) => {
        this.empleados = data;
      },
      error: (error) => {
        console.error('Error al listar empleados:', error);
      },
      complete: () => {
        console.log('Listado de empleados completado.');
      }
    });
  }

  guardarEmpleado(): void {
    if (this.empleado.id) {
      // Actualizar empleado existente
      this.empleadoService.actualizarEmpleado(this.empleado.id, this.empleado).subscribe({
        next: () => {
          this.listarEmpleados();
          this.cancelarEdicion();
        },
        error: (error) => {
          console.error('Error al actualizar empleado:', error);
        },
        complete: () => {
          console.log('Actualización de empleado completada.');
        }
      });
    } else {
      // Crear nuevo empleado
      this.empleadoService.crearEmpleado(this.empleado).subscribe({
        next: () => {
          this.listarEmpleados();
          this.empleado = {
            id: 0,
            nombre: '',
            apellido: '',
            direccion: '',
            telefono: ''
          };
        },
        error: (error) => {
          console.error('Error al crear empleado:', error);
        },
        complete: () => {
          console.log('Creación de empleado completada.');
        }
      });
    }
  }

  editarEmpleado(emp: Empleado): void {
    this.empleado = { ...emp }; // Copiar el empleado seleccionado
  }

  eliminarEmpleado(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este empleado?')) {
      this.empleadoService.eliminarEmpleado(id).subscribe({
        next: () => {
          this.listarEmpleados();
        },
        error: (error) => {
          console.error('Error al eliminar empleado:', error);
        },
        complete: () => {
          console.log('Eliminación de empleado completada.');
        }
      });
    }
  }

  cancelarEdicion(): void {
    this.empleado = {
      id: 0,
      nombre: '',
      apellido: '',
      direccion: '',
      telefono: ''
    };
  }
}
