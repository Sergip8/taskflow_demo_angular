import { Component, OnInit } from '@angular/core';
import { AppRoutes } from '../../../../../app.routes';
import { TicketService } from '../../../../../services/ticket.service';
import { ActivatedRoute } from '@angular/router';
import { TicketDetails } from '../../../../../models/ticket';



@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [],
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.css',
})
export class TicketDetailsComponent implements OnInit {

  ticketDetails!:TicketDetails
  ticketId = ""
  constructor(private ticketService: TicketService, private route: ActivatedRoute){
    route.params.subscribe(p => {
      if(p["ticketId"])
        this.ticketId = p["ticketId"]
    })
  }
  ngOnInit(): void {
    this.getDetails()
  }

  getDetails(){
    this.ticketService.getTicketDetails(this.ticketId).subscribe({
      next: data => {
        if(data.length >0){
          this.ticketDetails = data[0]
          console.log(this.ticketDetails)

        }
      },
      error: e => console.log(e)
    })
  }
}
