import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {NavbarComponent} from "./navbar/navbar.component";
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [
        NavbarComponent,
        IonicModule,
        CommonModule
    ],
    standalone: true
})
export class AppComponent {
    mostrarNavbar = true; // Controla la visibilidad del navbar

    constructor(private router: Router) {
        // Escucha los cambios de ruta
        this.router.events.subscribe(() => {
            // Comprueba si la ruta es '/login'
            this.mostrarNavbar = this.router.url !== '/login';
        });
    }
}
