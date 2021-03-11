import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../Models/Usuario';
import { AuthResponse } from './auth.response';
import { tap } from  'rxjs/operators';
import { Storage } from '@ionic/storage';
const apiUrl = 'https://obesidadbackend.azurewebsites.net/api/usuario/signin/';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  AUTH_SERVER_ADDRESS:  string  =  'https://obesidadbackend.azurewebsites.net';

  constructor(private  httpClient:  HttpClient, private  storage:  Storage) { }

  private getOptions(user: Usuario){
   
    let base64UserAndPassword = window.btoa(user.username + ":" + user.password);

    let basicAccess = 'Basic ' + base64UserAndPassword;

    let options = {
      headers: {
        'Authorization' : basicAccess,
        'Content-Type' : 'application/x-www-form-urlencoded',
      }
      //, withCredentials: true
    };
    
    return options;
  }


  login(user: Usuario): Observable<AuthResponse> {
 

    return this.httpClient.post(apiUrl, null, this.getOptions(user)).pipe(
      tap(async (res: AuthResponse) => {
      
        if (res.usuario) {
         
          await this.storage.set("token", res.token);
        }
      })
    );
  }

  async logout() {
    await this.storage.remove("token");
  }

  async isLoggedIn() {
    // return this.authSubject.asObservable();
    let token = await this.storage.get("token");
    if (token){ //Just check if exists. This should be checked with current date
      return true;
    }
    return false;
  }
}
