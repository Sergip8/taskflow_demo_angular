import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../../../../services/ticket.service';
import { Ticket, TicketFilter } from '../../../../../models/ticket';
import { SelectComponent } from '../../../../shared/select/select';
import { NgClass } from '@angular/common';
import { AuthService } from '../../../../public/auth/auth.service';
import { PaginationComponent } from "../../../../shared/pagination/pagination";
import { Pagination } from '../../../../../models/pagination';



@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [SelectComponent, NgClass, PaginationComponent],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketsComponent implements OnInit {

orderSelected(selected: string) {
  switch (selected) {
    case "Mas reciente":
      this.filterTicket.order = "createdAt"
      this.filterTicket.orderDirection = "desc"
      break;
    case "Mas antiguo":
      this.filterTicket.order = "createdAt"
      this.filterTicket.orderDirection = "asc"
      break;
    default:
      break
}
this.getTickets()
}
getStatus(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  console.log(inputElement.value)
  this.filterTicket.status = inputElement.value;
  this.getTickets()
}

pagination: Pagination = {
  page: 0,
  size: 10,
  count: 1
}

  sortSelect = {
    default: "ordenar por",
    list: ["Mas reciente", "Mas antiguo"]
  }
  stautsList = ["Activo", "En Proceso", "Finalizado"]
  constructor(private ticketService: TicketService, private authService: AuthService){
  
  }
  ngOnInit(): void {
    this.getTickets()
    // if(this.authService.getCompanyId()){
    //   this.getTickets(this.authService.getCompanyId() || "")
    // }
  }

  filterTicket: TicketFilter = new TicketFilter()
  tickets!:any
  getTickets(){
    this.ticketService.getTicketsFiltered(this.filterTicket).subscribe({
      next: data => {
        this.tickets = data.data
        this.pagination = {
          page: data.page +1,
          count: data.count,
          size: 10
        }
        console.log(data)
      }
    })
  }
  gotoPage(page: number) {

      this.filterTicket.page = page -1
      this.getTickets()
    }
}
