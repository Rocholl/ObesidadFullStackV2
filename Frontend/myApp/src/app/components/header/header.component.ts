import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLogged: boolean = false;
  constructor(private menuCtrl: MenuController, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.checkLogin();
  }

  checkLogin(){
    this.auth.isLoggedIn().then((res) => {
      if (res) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    })
  }

  logout() {
    this.auth.logout().then(() => {
      this.isLogged = false;
      this.router.navigateByUrl("/login")
    })
  }

  help() {
    window.open("http://localhost:8080/Ayuda%20ObesidadFullStack.html", '_system');
  }
}
