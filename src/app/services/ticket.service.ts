import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../environments/environment.development";
import { BehaviorSubject } from "rxjs";
import { Ticket, TicketCreate, TicketDetails, TicketFilter } from "../models/ticket";

const baseUrl = environment.apiUrl
@Injectable({
  providedIn: 'root'
})
export class TicketService {
    getTicketsFiltered(ticketFilter: TicketFilter) {
      return this.http.post<any>(baseUrl+ "/ticket/filter", ticketFilter)
    }

    private ticket = new BehaviorSubject<Ticket[]>([]) 
    ticket$ = this.ticket.asObservable()
   

    updateTicket(ticket: Ticket[]){
        this.ticket.next(ticket) 
      }

    constructor(private http: HttpClient){}

    getTickets(userstoryId: string){
        return this.http.get<Ticket[]>(baseUrl+ "/ticket/userstory/" +userstoryId)
    }

    updateDbTicket(ticket: Ticket){
      console.log(ticket)
      return this.http.post<any>(baseUrl+ "/ticket/update", ticket)
    }
    createDbTicket(ticket: TicketCreate){
      return this.http.post<any>(baseUrl+ "/ticket/store", ticket)
    }
    getTicketDetails(ticketId: string){
      return this.http.get<TicketDetails[]>(baseUrl+ "/ticket/details/" +ticketId)
    }
    deleteTicket(ticketId: string){
      return this.http.get<any>(baseUrl+ "/ticket/delete/" +ticketId)
    }



}