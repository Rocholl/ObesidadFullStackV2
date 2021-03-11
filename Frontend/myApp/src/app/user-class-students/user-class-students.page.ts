import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { Centro } from '../Models/Centro';
import { Cursos } from '../Models/Cursos';
import { Healths } from '../Models/Healths';
import { AuthService } from '../services/auth.service';
import { HealthsService } from '../services/healths.service';

@Component({
  selector: 'app-user-class-students',
  templateUrl: './user-class-students.page.html',
  styleUrls: ['./user-class-students.page.scss'],
})
export class UserClassStudentsPage implements OnInit {
  curso: Cursos[];
  cursos: Cursos;
  idCentro: number;
  students: Healths[];
  currentClass;
  constructor(private alertController:AlertController,private auth: AuthService, private healthService: HealthsService, private router: Router, private storage: Storage, private menuCtrl: MenuController) { }
  toggleMenu() {
    this.menuCtrl.toggle();

  }
  ngOnInit() {
    this.storage.get("user").then(data => {
      this.idCentro = data.idCentro;

    })
    this.storage.get("class").then(data => {
      this.curso = data;
      console.log(data);
    });
    this.storage.get("currentClass").then(data => {
      this.currentClass = data;
      console.log(data);
    })
  }
  
  addHealth() {
    if (this.currentClass = null) {

      this.healthService.getByCurso(this.currentClass, this.idCentro).subscribe(data => {

        this.students = data;

      }, err => {
        this.presentAlert("problema de conexion");
      });

    } else {
      console.log(this.cursos)
      console.log(this.idCentro)
      this.healthService.getByCurso(this.cursos.idCursos, this.idCentro).subscribe(data => {

        this.students = data;

      }, err => {
        this.presentAlert("Problema de conexion");
      });

    }

  }
 
  doRefresh(event) {
    setTimeout(() => {
      console.log(this.students);
      this.addHealth();
      event.target.complete();
    }, 1000)

  }
  
  ionViewDidEnter() {
    if (this.currentClass != null) {
      this.addHealth();
    }
  }
  show() {

  }
  addRecord(id) {
    this.storage.set("idHealth", id);
    
    this.storage.set("currentClass", this.cursos.idCursos);
    this.router.navigateByUrl("form-health");

  }  compareWith(o1: Cursos, o2: Cursos) {
    return o1 && o2 ? o1.idCursos === o2.idCursos : o1 === o2;
  }
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: message,
      message: ' Try again.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
