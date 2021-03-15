import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Usuario } from '../Models/Usuario';
import { ObjectSenderService } from '../service/object-sender.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  isLogged:boolean;
  constructor(
    
    private router: Router, 
    private authService: AuthService, 
    private alertController: AlertController,
 
    private storage:Storage,
    private menuCtrl: MenuController
    ) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.isLogged= false;
  
      }else{
        this.isLogged= true;
  
      }
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }
  
  login(form){
    let user: Usuario = {
      id: null,
      username: form.value.email,
      password: form.value.password,
      nombre: null,
      apellidos: null,
      rol: null,
      idCentro: null
    };
    this.authService.login(user).subscribe((res)=>{
      console.log(res)
      console.log("hola")
      if(!res.token) {
        this.presentAlert("invalid credentials");
        return;
      }
      this.storage.set("user",res.usuario);
      this.storage.set("token", res.token);
      this.router.navigateByUrl('/user-page');
      form.reset();
    }, err => {
      this.presentAlert("Error");
    });
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: message,
      message: 'Could not login. Try again.',
      buttons: ['OK']
    });

    await alert.present();
  }
}