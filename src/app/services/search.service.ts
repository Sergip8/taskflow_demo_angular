import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";



const baseUrl = "https://s7ph3lz30b.execute-api.us-east-1.amazonaws.com"
const headers = { 'Access-Control-Allow-Origin': '*'};
@Injectable({
  providedIn: 'root'
})
export class SearchService {

    constructor(private http: HttpClient){}

    search(searchData: any){
        return this.http.post<any>(baseUrl+ "/search-table", searchData, {headers:headers})
    }


}