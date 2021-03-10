import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
   isLogged:boolean;
  constructor(private menuCtrl: MenuController,private auth:AuthService) { }

  ngOnInit() {
   if(this.auth.isLoggedIn){
     this.isLogged= true;
   }else{
     this.isLogged= false;
   }
  }

  logout(){
    this.auth.logout();
    }
    
    help(){
      window.open("http://localhost:8080/Ayuda%20ObesidadFullStack.html", '_system');
    }
}
