import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import {NavbarComponent} from "./navbar/navbar.component";
import {FooterComponent} from "./footer/footer.component";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
    imports: [IonApp, IonRouterOutlet, NavbarComponent, FooterComponent],
})
export class AppComponent {
  constructor() {}
}
