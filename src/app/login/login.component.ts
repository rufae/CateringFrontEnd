import { Component, OnInit } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {FooterComponent} from "../footer/footer.component";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        FooterComponent
    ]
})
export class LoginComponent  implements OnInit {

    usuario = {
        email: "",
        password: ""

    };


  constructor( private route: Router) { }

  ngOnInit() {}

    iniciarSesion(){
      this.route.navigate(['/clientes'])
    }

    registrarse(){}

}
