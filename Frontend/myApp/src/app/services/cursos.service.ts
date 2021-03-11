import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cursos } from '../Models/Cursos';
const apiUrl = 'https://obesidadbackend.azurewebsites.net/api/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  }),
};
@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private http: HttpClient) { }

  getCursos(): Observable<Cursos[]> {
   
    return this.http.get<Cursos[]>(apiUrl+"class/");
    
      // .pipe(
      //   tap(bicycle => console.log('fetched bicycles'))
      //   // ,
      //   // catchError(this.handleError('getBicycles', []))
      // );
  };
  getCursosByUserId(id): Observable<Cursos[]> {
 
    return this.http.get<Cursos[]>(apiUrl+"usuario/getUserAndClass/"+id);
    
      // .pipe(
      //   tap(bicycle => console.log('fetched bicycles'))
      //   // ,
      //   // catchError(this.handleError('getBicycles', []))
      // );
  };
  
}