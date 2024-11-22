import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../environments/environment.development";
import { Company } from "../models/company";


const baseUrl = environment.apiUrl
const headers = { 'Access-Control-Allow-Origin': '*'};
@Injectable({
  providedIn: 'root'
})
export class CompanyService {

    constructor(private http: HttpClient){}


    getAllCompanies(){
        return this.http.get<Company[]>(baseUrl+ "/companies/all")
    }

}