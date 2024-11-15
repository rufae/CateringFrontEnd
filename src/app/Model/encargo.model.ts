import { Cliente } from './cliente.model';
import { Menu } from './menu.model';

export interface Encargo {
  id: number;
  clienteId: number;
  menuId: number;
  cliente: Cliente;
  menu: Menu;
  fechaEncargo: string;
  fechaEntrega: string;
}
