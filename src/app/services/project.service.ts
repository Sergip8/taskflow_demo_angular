import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../environments/environment.development";
import { Project } from "../models/project";

const baseurl = environment.apiUrl
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

    constructor(private http: HttpClient){}

    getCompanyProjects(companyId: string){
        return this.http.get<Project[]>(baseurl+ "/projects/company/"+companyId)
    }
}