import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu } from '../Model/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) {}

  listarMenus(): Observable<Menu[]> {
    return this.http.get<Menu[]>("api/menus");
  }

  obtenerMenuPorId(id: number): Observable<Menu> {
    return this.http.get<Menu>(`api/menus/${id}`);
  }

  crearMenu(menu: Menu): Observable<Menu> {
    return this.http.post<Menu>("api/menus", menu);
  }

  actualizarMenu(id: number, menu: Menu): Observable<Menu> {
    return this.http.put<Menu>(`api/menus/${id}`, menu);
  }

  eliminarMenu(id: number): Observable<void> {
    return this.http.delete<void>(`api/menus/${id}`);
  }
}
