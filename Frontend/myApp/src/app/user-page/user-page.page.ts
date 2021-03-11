import { Component, OnInit } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Centro } from '../Models/Centro';
import { Usuario } from '../Models/Usuario';
import { ObjectSenderService } from '../service/object-sender.service';
import { AuthResponse } from '../services/auth.response';
import { CentrosService } from '../services/centros.service';
import { CursosService } from '../services/cursos.service';
import { HealthsService } from '../services/healths.service';
import { BrowserTab } from '@ionic-native/browser-tab/ngx';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Cursos } from '../Models/Cursos';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.page.html',
  styleUrls: ['./user-page.page.scss'],
})
export class UserPagePage implements OnInit {
  user: any;
  centro: Centro;
  isMobile: Boolean;
  isLogged: boolean;
  constructor(private obj: ObjectSenderService, private router: Router, private centroService: CentrosService,
    private auth: AuthService, private cursoService: CursosService, private storage: Storage, private menuCtrl: MenuController, private browser: BrowserTab, private platform: Platform) { }

  toggleMenu() {
    this.menuCtrl.toggle();
  }

  ngOnInit() {
    if (this.auth.isLoggedIn) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    if (this.platform.is('android')) {
      this.isMobile = true;

    } else {
      this.isMobile = false;

    }

    this.storage.get("user").then(data => {
      this.user = data;
      console.log(data);
      this.cursoService.getCursosByUserId(this.user.idUsuarios).subscribe(curso => {
        this.storage.set("class", curso);
        console.log(curso)
      });
    }).catch().finally(() => {
      this.saveParams();

    })

  }
  viewReport() {
    console.log(this.centro.idCentro);
    if (this.platform.is('android') || this.platform.is('ios')) {
      this.browser.openUrl("http://localhost:8080/api/centro/report/" + this.centro.idCentro);
    }
    window.open("http://localhost:8080/api/centro/report/" + this.centro.idCentro, '_system');

  }
  saveParams() {
    this.centroService.getCentroId(this.user.idCentro).subscribe(centro => {
      console.log(this.user)

      this.centro = centro;
      this.storage.set("centro", centro);
      this.centroService.getReport(this.centro.idCentro);
    });

  }

  addRecords() {
    this.router.navigateByUrl("user-class-students");
  }

  logout() {
    this.auth.logout();
  }
  
  compareWith(o1: Cursos, o2: Cursos) {
    return o1 && o2 ? o1.idCursos === o2.idCursos : o1 === o2;
  }
}



