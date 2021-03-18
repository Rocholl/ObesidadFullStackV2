import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CentrosService } from '../services/centros.service';
import { CursosService } from '../services/cursos.service';
import { HealthsService } from '../services/healths.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { Cursos } from '../Models/Cursos';
import { ObjectSenderService } from '../service/object-sender.service';

import { Storage } from '@ionic/storage';
import { Centro } from '../Models/Centro';
import { Healths } from '../Models/Healths';
import { AlertController, MenuController } from '@ionic/angular';
import { HealthsExtendService } from '../services/health-extend.service';

@Component({
  selector: 'app-form-health',
  templateUrl: './form-health.page.html',
  styleUrls: ['./form-health.page.scss'],
})
export class FormHealthPage implements OnInit {
  
	@ViewChild('recordSlider') recordSlider;
  cursos: Cursos[];
  centro: Centro;
  curso: Cursos;
  cursoId: number;
  centroId: number;
  idStudent;

  isSubmitted = false;


  Tanita: FormGroup;
  Tanita2: FormGroup;
  Manual: FormGroup;
  isLogged:boolean;
  constructor(private router: Router,private menuCtrl: MenuController,private alertController:AlertController, private auth: AuthService, private healthService: HealthsService,private healthExtendService:HealthsExtendService, private centroService: CentrosService, private storage: Storage, public formBuilder: FormBuilder) {
    this.Tanita = formBuilder.group({
      peso: ["",Validators.compose([Validators.maxLength(2),Validators.min(20),Validators.max(99)])],
      percent_Grasa: ["", Validators.compose([Validators.maxLength(2),Validators.min(5),Validators.max(50)])],
      percent_Hidratacion: ["",Validators.compose([Validators.maxLength(2),Validators.min(40),Validators.max(80)])],
      peso_Muscular: ["",Validators.compose([Validators.maxLength(2),Validators.min(5),Validators.max(40)])],
      masa_Muscular: ["",Validators.compose([Validators.maxLength(15),Validators.min(15),Validators.max(40)])],

    });
    this.Tanita2 = formBuilder.group({
      peso_Oseo: ["",Validators.compose([Validators.maxLength(2),Validators.min(1),Validators.max(5)])],
      kilocalorias: ["", Validators.compose([Validators.maxLength(4),Validators.min(1000),Validators.max(4000)])],
      edad_Metabolica: ["",Validators.compose([Validators.maxLength(2),Validators.min(5),Validators.max(25)])],
      masa_Viseral: ["",Validators.compose([Validators.maxLength(15),Validators.min(10),Validators.max(40)])],

    })
   
   this.Manual = formBuilder.group({
    altura: ["",Validators.compose([Validators.maxLength(3),Validators.min(120),Validators.max(220)])],
    perimetro_Abdominal: ["", Validators.compose([Validators.maxLength(3),Validators.min(75),Validators.max(120)])],
    actividad_Fisica: ["",Validators.compose([Validators.maxLength(2),Validators.min(0),Validators.max(7)])],
   

  });
  }
  toggleMenu() {
    this.menuCtrl.toggle();
  }

  //forms
  next(){
    this.recordSlider.slideNext();
  }
  prev(){
    this.recordSlider.slidePrev();

  }
  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.isLogged= true;
  
      }else{
        this.isLogged= false;
  
      }
    if (!this.auth.isLoggedIn()) {
      this.router.navigateByUrl("/login");

    }
    this.saveParams();

  }
  
 
  async saveParams() {
  await  this.storage.get("class").then(data => {
      this.cursos = data;

    });
    this.storage.get("centro").then(data => {
      this.centro = data;
    });
    this.storage.get("idHealth").then(data => {
      this.idStudent = data;
      console.log(data);
    })
  }
  submitForm() {
    
    this.isSubmitted = true;

    if(!this.Tanita.valid){
        this.recordSlider.slideTo(0);
    } 
    else if(!this.Tanita2.valid){
        this.recordSlider.slideTo(1);
    }  else if(!this.Manual.valid){
      this.recordSlider.slideTo(2);
  }
    else {
        console.log("success!")
        console.log(this.Tanita.value);
        console.log(this.Tanita2.value);
        console.log(this.Manual.value);
        let record = {
          id:null,
          fecha: null,

         
          peso: this.Tanita.controls["peso"].value,
          percent_Grasa:this.Tanita.controls["percent_Grasa"].value,
          percent_Hidratacion:this.Tanita.controls["percent_Hidratacion"].value,
          peso_Muscular:this.Tanita.controls["peso_Muscular"].value,
          masa_Muscular:this.Tanita.controls["masa_Muscular"].value,
          peso_Oseo:this.Tanita2.controls["peso_Oseo"].value,
          kilocalorias:this.Tanita2.controls["kilocalorias"].value,
          edad_Metabolica:this.Tanita2.controls["edad_Metabolica"].value,
          altura:this.Manual.controls["altura"].value,

          masa_Viseral:this.Tanita2.controls["masa_Viseral"].value,
        
          perimetro_Abdominal:this.Manual.controls["perimetro_Abdominal"].value,
          actividad_Fisica:this.Manual.controls["actividad_Fisica"].value,
          idHealth:this.idStudent,
        }
        this.healthExtendService.postHealth(record).subscribe((res) => {

          this.handleButtonClick();
          this.Tanita.reset();
          this.Tanita2.reset();

          this.Manual.reset();

          
        });
    }
 
  }
  async handleButtonClick() {
    setTimeout(() => {
      console.log('Async operation has ended');
    this.router.navigateByUrl("user-class-students");
      
    }, 500);

    const alert = await this.alertController.create({
      header: 'Registro creado',
      message: "Registro creado",
   
    });

    await alert.present();
  }
  compareWith(o1: Cursos, o2: Cursos) {
    return o1 && o2 ? o1.idCursos === o2.idCursos : o1 === o2;
  }
  
}

