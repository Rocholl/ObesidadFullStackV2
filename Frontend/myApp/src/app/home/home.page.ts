import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isLogged:boolean;
  constructor(private menuCtrl: MenuController,private auth:AuthService) {}
  
  toggleMenu() {
    this.menuCtrl.toggle();
  }
  ngOnInit() {
    if (this.auth.isLoggedIn()) {
    this.isLogged= true;

    }else{
      this.isLogged= false;

    }
  }
  
  }

