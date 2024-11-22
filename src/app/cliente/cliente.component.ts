import { Component, OnInit } from '@angular/core';
import { Cliente } from '../Model/cliente.model';
import { ClienteService } from '../Service/cliente.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {provideHttpClient} from "@angular/common/http";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  standalone: true,
  styleUrls: ['./cliente.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
        FooterComponent
    ],
})
export class ClienteComponent implements OnInit {
  clientes: Cliente[] = [];
  cliente: Cliente = {
    id: 0,
    nombre: '',
    apellido: '',
    direccion: '',
    telefono: ''
  };

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.listarClientes();
  }

  listarClientes(): void {
    this.clienteService.listarClientes().subscribe({
      next: (data) => {
        this.clientes = data;
      },
      error: (error) => {
        console.error('Error al listar clientes:', error);
      },
      complete: () => {
        console.log('Listado de clientes completado.');
      }
    });
  }

  guardarCliente(): void {
    if (this.cliente.id) {
      // Actualizar cliente existente
      this.clienteService.actualizarCliente(this.cliente.id, this.cliente).subscribe({
        next: () => {
          this.listarClientes();
          this.cancelarEdicion();
        },
        error: (error) => {
          console.error('Error al actualizar cliente:', error);
        },
        complete: () => {
          console.log('Actualización de cliente completada.');
        }
      });
    } else {
      // Crear nuevo cliente
      this.clienteService.crearCliente(this.cliente).subscribe({
        next: () => {
          this.listarClientes();
          this.cliente = {
            id: 0,
            nombre: '',
            apellido: '',
            direccion: '',
            telefono: ''
          };
        },
        error: (error) => {
          console.error('Error al crear cliente:', error);
        },
        complete: () => {
          console.log('Creación de cliente completada.');
        }
      });
    }
  }

  editarCliente(cli: Cliente): void {
    this.cliente = { ...cli }; // Copiar el cliente seleccionado
  }

  eliminarCliente(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
      this.clienteService.eliminarCliente(id).subscribe({
        next: () => {
          this.listarClientes();
        },
        error: (error) => {
          console.error('Error al eliminar cliente:', error);
        },
        complete: () => {
          console.log('Eliminación de cliente completada.');
        }
      });
    }
  }

  cancelarEdicion(): void {
    this.cliente = {
      id: 0,
      nombre: '',
      apellido: '',
      direccion: '',
      telefono: ''
    };
  }
}
