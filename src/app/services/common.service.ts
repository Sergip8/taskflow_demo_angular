import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Alert } from '../models/alert';

@Injectable({
  providedIn: 'root'
})
  
export class CommonService {

  private alert = new BehaviorSubject<Alert|null>(null) 
  alert$ = this.alert.asObservable()

  updateAlert(alert: Alert){
    this.alert.next(alert)
  }
  constructor() { }

  public prepareRoute(...paths: string[]): string{
    let rootRoute = '/';
    return rootRoute.concat(paths.filter(Boolean).join('/'));
  }
}
