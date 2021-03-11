import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Healths } from '../Models/Healths';
const apiUrl = 'https://obesidadbackend.azurewebsites.net/api/health/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  }),
};
@Injectable({
  providedIn: 'root'
})
export class HealthsService {

  constructor(private http: HttpClient) { }
  postHealth(heath:Healths):Observable<any> {

    

    return this.http.post(apiUrl,  httpOptions);

  }
  getByMunicipio(id): Observable<Healths[]> {
    console.log(apiUrl, httpOptions);
    return this.http.get<Healths[]>(apiUrl+"municipio/"+id);

    // .pipe(
    //   tap(bicycle => console.log('fetched bicycles'))
    //   // ,
    //   // catchError(this.handleError('getBicycles', []))
    // );
  };

  getByCurso(idCurso,idCentro): Observable<Healths[]> {
    let bodyEncoded = new URLSearchParams();
   
   
    bodyEncoded.append("idCurso", idCurso.toString());
    bodyEncoded.append("idCentro", idCentro.toString());




    let body = bodyEncoded.toString();
   
    return this.http.post<Healths[]>(apiUrl+"healthbyclass/",body,httpOptions);

    // .pipe(
    //   tap(bicycle => console.log('fetched bicycles'))
    //   // ,
    //   // catchError(this.handleError('getBicycles', []))
    // );
  };
}
