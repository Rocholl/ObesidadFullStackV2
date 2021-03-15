import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Centro } from '../Models/Centro';
const apiUrl = 'https://obesidadbackend.azurewebsites.net/api/centro/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  }),
};
@Injectable({
  providedIn: 'root'
})

export class CentrosService {

  constructor(private http: HttpClient) { }

  getCentros(): Observable<any[]> {
 
    return this.http.get<any[]>(apiUrl);
    
      // .pipe(
      //   tap(bicycle => console.log('fetched bicycles'))
      //   // ,
      //   // catchError(this.handleError('getBicycles', []))
      // );
  };
  
  getReport(id){
    console.log(id);
    return this.http.get(apiUrl+"reports/"+id);
  }

  getCentroId(id): Observable<Centro> {
  console.log(id)
    return this.http.get<Centro>(apiUrl+id);
    
      // .pipe(
      //   tap(bicycle => console.log('fetched bicycles'))
      //   // ,
      //   // catchError(this.handleError('getBicycles', []))
      // );
  };
}
