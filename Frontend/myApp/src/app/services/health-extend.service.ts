import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponse } from '../services/data.response';
import { HealthsExtend } from '../Models/healthExtend';
const apiUrl = 'https://obesidadbackend.azurewebsites.net/api/healthextend/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  }),
};
@Injectable({
  providedIn: 'root'
})
export class HealthsExtendService {

  constructor(private http: HttpClient) { }
  postHealth(heath: HealthsExtend): Observable<any> {
    console.log(heath);
    let bodyEncoded = new URLSearchParams();
    bodyEncoded.append("idHealths", "");
    bodyEncoded.append("fecha", "");
    bodyEncoded.append("peso", heath.peso.toString());

    bodyEncoded.append("percent_Grasa", heath.percent_Grasa.toString());

    bodyEncoded.append("percent_Hidratacion", heath.percent_Hidratacion.toString());

    bodyEncoded.append("peso_Muscular", heath.peso_Muscular.toString());

    bodyEncoded.append("masa_Muscular", heath.masa_Muscular.toString());

    bodyEncoded.append("peso_Oseo", heath.peso_Oseo.toString());

    bodyEncoded.append("kilocalorias", heath.kilocalorias.toString());

    bodyEncoded.append("edad_Metabolica", heath.edad_Metabolica.toString());

    bodyEncoded.append("altura", heath.altura.toString());

    bodyEncoded.append("masa_Viseral", heath.masa_Viseral.toString());

    bodyEncoded.append("perimetro_Abdominal", heath.perimetro_Abdominal.toString());

    bodyEncoded.append("actividad_Fisica", heath.actividad_Fisica.toString());

    bodyEncoded.append("idHealth", heath.idHealth.toString());

    let body = bodyEncoded.toString();

    return this.http.post(apiUrl, body, httpOptions);

  }
  averages(): Observable<DataResponse> {

    return this.http.get<DataResponse>(apiUrl + "avg");
  }
  centerAverage(idCentro): Observable<HealthsExtend> {
    return this.http.get<HealthsExtend>(apiUrl + "centeraverage/" + idCentro);
  }
  centersAverage(): Observable<any> {
    return this.http.get<any>(apiUrl + "maparray/");
  }
  pipebysex(sex): Observable<DataResponse> {
    return this.http.get<any>(apiUrl + "pipebysex/"+sex);
  }
  pipebyage(age): Observable<DataResponse> {
    return this.http.get<any>(apiUrl + "pipebyage/"+age);
  }
  pipebyphisicalActivity(ph):Observable<DataResponse>{
    return this.http.get<any>(apiUrl + "pipebyphisicalactivity/"+ph);
  }
}
