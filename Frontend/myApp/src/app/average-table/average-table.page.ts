import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import { Centro } from '../Models/Centro';
import { AuthService } from '../services/auth.service';
import { CentrosService } from '../services/centros.service';
import { DataResponse } from '../services/data.response';
import { HealthsExtendService } from '../services/health-extend.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-average-table',
  templateUrl: './average-table.page.html',
  styleUrls: ['./average-table.page.scss'],
})
export class AverageTablePage implements OnInit {
  dataResponse: DataResponse;
  isLogged: boolean;
  selectBool: boolean;
  selectBool2: boolean;
  selectBool3: boolean;
  selectBool4: boolean;
  phisicalActivity:number;
  age;
  sex;
  selectParam;
  centrosSelect: Centro[];
  centrosSelected: Centro;
  constructor(public loadingController: LoadingController,private alertController:AlertController, private menuCtrl: MenuController, private auth: AuthService, private centroService: CentrosService, private healthExtendService: HealthsExtendService) { }

  toggleMenu() {
    this.menuCtrl.toggle();
    console.log(this.dataResponse);
  }
  ngOnInit() {
    this.healthExtendService.averages().subscribe((res) => {
      this.dataResponse = res[0];

    })
    if (this.auth.isLoggedIn()) {
      this.isLogged = true;

    } else {
      this.isLogged = false;

    }


  }
  select() {
    console.log(this.selectParam);

    if (this.selectParam == "Centro") {
      this.centroService.getCentros().subscribe(data => {
        this.centrosSelect = data;
        this.selectBool3= false;
        this.selectBool2= false;
        this.selectBool4= false;

        this.selectBool = true;

      })
    }
    if (this.selectParam == "Sexo") {
      this.selectBool2 = true;
      this.selectBool3= false;
      this.selectBool= false;
      this.selectBool4= false;

    }
    if (this.selectParam == "General") {
      this.presentLoading()
      this.healthExtendService.averages().subscribe((res) => {
        this.dataResponse = res[0];
        
        this.selectBool3= false;
        this.selectBool2= false;
        this.selectBool4= false;

        this.selectBool = false;
      })
    }
    if(this.selectParam=="Edad"){
      this.selectBool2= false;
      this.selectBool= false;
      this.selectBool3= true;
      this.selectBool4= false;

    }
    if(this.selectParam=="Actividad Fisica"){
this.selectBool4=true;
this.selectBool3= false;
this.selectBool2= false;
this.selectBool= false;
    }
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Espere porfavor...',
      duration: 500
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  selectService() {
    this.presentLoading();
    this.healthExtendService.centerAverage(this.centrosSelected.idCentro).subscribe(data => {
      console.log(data);

      this.dataResponse = data[0];
      console.log(this.centrosSelected.idCentro)
    }, err => {
      this.presentAlert("no se ha podido cargar por falta de conexion");
    }
    )
  }

  selectService2() {
    this.presentLoading();
    this.healthExtendService.pipebysex(this.sex).subscribe(data => {


      this.dataResponse = data[0];

    }, err => {
      this.presentAlert("no se ha podido cargar por falta de conexion");
    }
    )
  }

  selectService3(){
    this.presentLoading();
    this.healthExtendService.pipebyage(this.age).subscribe(data => {


      this.dataResponse = data[0];

    }, err => {
      this.presentAlert("no se ha podido cargar por falta de conexion");
    }
    )
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
  selectService4() {
    this.presentLoading();
    this.healthExtendService.pipebyphisicalActivity(this.phisicalActivity).subscribe(data => {
      console.log(data);

      this.dataResponse = data[0];
      console.log(this.centrosSelected.idCentro)
    }, err => {
      this.presentAlert("no se ha podido cargar por falta de conexion");
    }
    )
  }
  compareWith(o1: Centro, o2: Centro) {
    return o1 && o2 ? o1.idCentro === o2.idCentro : o1 === o2;
  }
}

