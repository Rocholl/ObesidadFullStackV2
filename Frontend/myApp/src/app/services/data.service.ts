import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataResponse } from '../services/data.response'
const apiUrl = 'https://obesidadbackend.azurewebsites.net/api/healthextend/avg';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  }),
};
@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private http: HttpClient) { }

  getData(): Observable<DataResponse[]> {
 
    return this.http.get<DataResponse[]>(apiUrl);

  };

}
