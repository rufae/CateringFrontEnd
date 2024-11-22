import { Component, OnInit } from '@angular/core';
import { Encargo } from '../Model/encargo.model';
import { Cliente } from '../Model/cliente.model';
import { Menu } from '../Model/menu.model';
import { EncargoService } from '../Service/encargo.service';
import { ClienteService } from '../Service/cliente.service';
import { MenuService } from '../Service/menu.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {FooterComponent} from "../footer/footer.component";

@Component({
    selector: 'app-encargo',
    templateUrl: './encargo.component.html',
    standalone: true,
    styleUrls: ['./encargo.component.scss'],
    imports: [
        CommonModule,
        FormsModule,
        FooterComponent
    ]
})
export class EncargoComponent implements OnInit {
    encargos: Encargo[] = [];
    clientes: Cliente[] = [];
    menus: Menu[] = [];
    encargo: Encargo = {
        id: 0,
        clienteId: 0,
        menuId: 0,
        cliente: { id: 0, nombre: '', apellido: '', direccion: '', telefono: '' },
        menu: { idMenu: 0, nombre: '', descripcion: '', precio: 0 },
        fechaEncargo: '',
        fechaEntrega: ''
    };

    constructor(
        private encargoService: EncargoService,
        private clienteService: ClienteService,
        private menuService: MenuService
    ) {}

    ngOnInit(): void {
        this.listarEncargos();
        this.listarClientes();
        this.listarMenus();
    }

    listarEncargos(): void {
        this.encargoService.listarEncargos().subscribe({
            next: (data) => {
                this.encargos = data;
            },
            error: (error) => {
                console.error('Error al listar encargos:', error);
            },
            complete: () => {
                console.log('Listado de encargos completado.');
            }
        });
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

    guardarEncargo(): void {
        console.log('Encargo enviado:', this.encargo);
        if (this.encargo.clienteId === 0) {
            console.error('Error: Cliente no seleccionado.');
            alert('Por favor, seleccione un cliente antes de guardar el encargo.');
            return;
        }
        if (this.encargo.menuId === 0) {
            console.error('Error: Menú no seleccionado.');
            alert('Por favor, seleccione un menú antes de guardar el encargo.');
            return;
        }

        // Asignamos los IDs correctos a los objetos cliente y menu
        this.encargo.cliente.id = this.encargo.clienteId;
        this.encargo.menu.idMenu = this.encargo.menuId;

        if (this.encargo.id) {
            // Actualizar encargo existente
            this.encargoService.actualizarEncargo(this.encargo.id, this.encargo).subscribe({
                next: () => {
                    this.listarEncargos();
                    this.cancelarEdicion();
                },
                error: (error) => {
                    console.error('Error al actualizar encargo:', error);
                },
                complete: () => {
                    console.log('Actualización de encargo completada.');
                }
            });
        } else {
            // Crear nuevo encargo
            this.encargoService.crearEncargo(this.encargo).subscribe({
                next: () => {
                    this.listarEncargos();
                    this.encargo = {
                        id: 0,
                        clienteId: 0,
                        menuId: 0,
                        cliente: { id: 0, nombre: '', apellido: '', direccion: '', telefono: '' },
                        menu: { idMenu: 0, nombre: '', descripcion: '', precio: 0 },
                        fechaEncargo: '',
                        fechaEntrega: ''
                    };
                },
                error: (error) => {
                    console.error('Error al crear encargo:', error);
                },
                complete: () => {
                    console.log('Creación de encargo completada.');
                }
            });
        }
    }

    editarEncargo(enc: Encargo): void {
        this.encargo = { ...enc }; // Copiar el encargo seleccionado
        // Asignar el clienteId y menuId para la edición
        this.encargo.clienteId = enc.cliente.id;
        this.encargo.menuId = enc.menu.idMenu;
    }

    eliminarEncargo(id: number): void {
        if (confirm('¿Estás seguro de que deseas eliminar este encargo?')) {
            this.encargoService.eliminarEncargo(id).subscribe({
                next: () => {
                    this.listarEncargos();
                },
                error: (error) => {
                    console.error('Error al eliminar encargo:', error);
                },
                complete: () => {
                    console.log('Eliminación de encargo completada.');
                }
            });
        }
    }

    cancelarEdicion(): void {
        this.encargo = {
            id: 0,
            clienteId: 0,
            menuId: 0,
            cliente: { id: 0, nombre: '', apellido: '', direccion: '', telefono: '' },
            menu: { idMenu: 0, nombre: '', descripcion: '', precio: 0 },
            fechaEncargo: '',
            fechaEntrega: ''
        };
    }
}
