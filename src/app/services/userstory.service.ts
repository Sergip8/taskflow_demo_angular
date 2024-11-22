import { Injectable } from "@angular/core";
import { environment } from "../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Userstory, UserstoryForm, UserstoryUpdate } from "../models/userstory";
import { BehaviorSubject, Observable } from "rxjs";


const baseUrl = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class UserstoryService {

    private userstory = new BehaviorSubject<Userstory[]>([]) 
    userstory$ = this.userstory.asObservable()
    constructor(private http: HttpClient){}

    updateUser(userstory: Userstory[]){
        this.userstory.next(userstory) 
      }

    getUserStories(projectId: string): Observable<Userstory[]>{
        return this.http.get<Userstory[]>(baseUrl+ "/userstory/project/"+projectId)
    }

    createUserstory(userstory: UserstoryForm){
        return this.http.post<any>(baseUrl+ "/userstory/store", userstory)
    }
    updateUserstory(userstory: UserstoryUpdate){
        return this.http.post<any>(baseUrl+ "/userstory/update", userstory)
    }

}