import { Component, OnInit } from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    standalone: true,
    imports: [
        IonicModule
    ]
})
export class NavbarComponent  implements OnInit {

  constructor(private router: Router) { }

    navigateTo(route: string): void {
        this.router.navigate([`/${route}`]);
    }

  ngOnInit() {}

}
