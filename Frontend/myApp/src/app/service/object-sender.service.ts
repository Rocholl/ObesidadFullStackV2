import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObjectSenderService {

  private objectSource = new Object;
  private listSource = new BehaviorSubject<any[]>([]);

  $getListSource = this.listSource.asObservable();

  constructor() { }

  getObjectSource(){
  return this.objectSource;
  }

  sendListSource(list:any[]){
    this.listSource.next(list);
  }
  
}
