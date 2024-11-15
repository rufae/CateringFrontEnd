import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Encargo } from '../Model/encargo.model';

@Injectable({
  providedIn: 'root'
})
export class EncargoService {

  constructor(private http: HttpClient) {}

  listarEncargos(): Observable<Encargo[]> {
    return this.http.get<Encargo[]>("api/encargos");
  }

  listarEncargosPorCliente(clienteId: number): Observable<Encargo[]> {
    return this.http.get<Encargo[]>(`api/encargos/cliente/${clienteId}`);
  }

  crearEncargo(encargo: Encargo): Observable<Encargo> {
    return this.http.post<Encargo>("api/encargos", encargo);
  }

  actualizarEncargo(id: number, encargo: Encargo): Observable<Encargo> {
    return this.http.put<Encargo>(`api/encargos/${id}`, encargo);
  }

  eliminarEncargo(id: number): Observable<void> {
    return this.http.delete<void>(`api/encargos/${id}`);
  }
}
