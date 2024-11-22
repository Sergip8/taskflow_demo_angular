import { Component, OnInit } from '@angular/core';
import { UserstoryService } from '../../../../../services/userstory.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Userstory, UserstoryUpdate } from '../../../../../models/userstory';
import { ModalComponent } from "../../../../shared/modal/modal.component";
import { FormComponent } from "../../forms/form.component";
import { AuthService } from '../../../../public/auth/auth.service';
import { AlertType } from '../../../../shared/alert/alert.type';
import { AsyncPipe, NgClass, NgFor } from '@angular/common';
import { TicketService } from '../../../../../services/ticket.service';
import { SelectComponent } from '../../../../shared/select/select';
import { Ticket } from '../../../../../models/ticket';
import { AppRoutes } from '../../../../../app.routes';
import { CommonService } from '../../../../../services/common.service';



@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [ModalComponent, FormComponent, NgFor, AsyncPipe, NgClass, SelectComponent, RouterLink],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit {
statusSelected(status: string) {
  this.statusS = status

}
applyChange(ticket: Ticket, index: number) {
  console.log(ticket)
  if(this.statusS != ""){
    const ticketMod: Ticket ={
      id: ticket.id,
      title: ticket.title,
      description: ticket.description,
      status: ticket.status
    } 
    console.log(ticketMod)
    ticketMod.status = this.statusS 
    this.currentTickets[index].status = this.statusS
     this.ticketService.updateTicket(this.currentTickets)
     this.updateTicket(<Ticket>ticketMod)
     this.showStatusSelect = ""
  }
 
}
changeStatus(ticket: Ticket) {
  this.showStatusSelect = ticket.id
  this.statusSelect.default = ticket.status
}
getTickets(userstoryId: string) {
  if(this.userstoryId != userstoryId)
    this.getUserstoryTickets(userstoryId)
  this.userstoryId = userstoryId
}
dataForm(data: any) {
  this.showModal = false
  console.log(this.type)
  console.log(this.operation)
  if(this.operation == "create"){
    if(this.type == "userstory")
      this.createUserstory(data)
    if(this.type == "ticket")
      this.createTicket(data)
  }
  if(this.operation == "update"){
    if(this.type == "userstory")
      this.updateUserStory(data)
    if(this.type == "ticket")
      this.updateTicket(data)
  }
  console.log(data)
  this.getUserstory(this.projectId)
}
create(type: "userstory" | "ticket") {
  this.operation = "create"
  this.type = type 
  console.log(this.type)
  console.log(this.operation)
  if (this.type == "userstory")
    this.usSelected = this.createUserstoryKeys
  if (this.type == "ticket")
    this.usSelected = this.createTicketKeys
  this.showModal = true
}
  closeModal(modal: boolean) {
    this.warningMsg = ""
    this.showModal = modal
    setTimeout(() => {
      this.usSelected = null
    }, 200);
}
editItem(data: any, type: "userstory" |"ticket", ) {
  this.type = type
  this.operation = "update"
  this.usSelected = data
this.dataSelected = data
 this.showModal = true
}

  dataSelected:any
  readonly appRoutes = AppRoutes;
  currentTickets: Ticket[] = []
  statusS = ""
  showStatusSelect = ""
  statusSelect = {
    default: "",
    list: ["Activo", "En Proceso", "Finalizado"]
  }
  type: "userstory" | "ticket" = "userstory"
  operation: "create" | "update" = "create"
  showModal = false
  usSelected!: any
  userstory: Userstory[] = [] 
  keys: string[] = [
    "id",
        "title",
        "description",
        "assigned User Name"
  ] 
  createUserstoryKeys = [
    "title",
    "ticketTitle",
    "description",
    "ticketDescription"
  ]
  createTicketKeys = [
    "title",
    "description",
  ]
  userstoryId = ""
  projectId = ""
  readonly alertType = AlertType;
  alert = this.alertType.Info
  showAlert = false
  alertMsg = ""
  warningMsg = ""
  assignedUserId = ""
  ticketIdToDelete = ""
  bannedFields = ["status","comments", "assignedusername", "assigneduseremail"] 
  constructor(
    public readonly commonServices: CommonService,
    public userstoryService: UserstoryService,
    private authService: AuthService,
    public ticketService: TicketService,
    private commonService: CommonService,
     private route: ActivatedRoute){
    route.params.subscribe(p => {
      if(p["projectId"])
        this.projectId = p["projectId"]
        this.getUserstory(p["projectId"])

    })
this.assignedUserId = this.authService.getUserId()
  }

  ngOnInit(): void {
    
  }

  getUserstory(projectId: string){
    this.userstoryService.getUserStories(projectId).subscribe({
      next: data => {
        this.userstoryService.updateUser(data)
       
      },
      error: e => console.log
    })
  }
  createUserstory(data: any){
    const userstory = Object.assign({...data, assignedUserId: this.assignedUserId, projectId: this.projectId})
    this.userstoryService.createUserstory(userstory).subscribe({
      next: data => {
        if(data.status == "Success"){
          this.commonService.updateAlert({status: AlertType.Success, msn: data.msn})
        }else{
          this.commonService.updateAlert({status: AlertType.Danger, msn: data.msn})
        }
        this.alertMsg = data.msn
      },error: e => {
        this.commonService.updateAlert({status: AlertType.Danger, msn: e.message})
      },complete: ()=> this.showAlertElement()
    })
    
  }
  showAlertElement(){
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false
    }, 4000);
    
  }
  getUserstoryTickets(userstoryId: string){
    this.ticketService.getTickets(userstoryId).subscribe({
      next: data => {
        console.log(data)
        this.currentTickets = data
        this.ticketService.updateTicket(data)
      },
      error: e => console.log
    })
  }
  updateTicket(ticket: Ticket){
    const ticketRes: Ticket = {
      id: this.dataSelected?.id || ticket.id,
      title: ticket.title,
      description: ticket.description,
      status:this.dataSelected?.status || ticket.status
    }
    this.ticketService.updateDbTicket(ticketRes).subscribe({
      next: data => {
        if(data.status == "Success"){
          this.commonService.updateAlert({status: AlertType.Success, msn: data.msn})
        }else{
          this.commonService.updateAlert({status: AlertType.Danger, msn: data.msn})
        }
        this.alertMsg = data.msn
      },error: e => {
        this.commonService.updateAlert({status: AlertType.Danger, msn: e.message})
      }
    })
  }
  updateUserStory(data: any){
    const userStory: UserstoryUpdate = {
        id: this.dataSelected.id,
        title: data.title,
        description: data.description
    }
    console.log(userStory)
    this.userstoryService.updateUserstory(userStory).subscribe({
      next: data => {
        if(data.status == "Success"){
          this.commonService.updateAlert({status: AlertType.Success, msn: data.msn})
        }else{
          this.commonService.updateAlert({status: AlertType.Danger, msn: data.msn})
        }
        this.alertMsg = data.msn
      },error: e => {
        this.commonService.updateAlert({status: AlertType.Danger, msn: e.message})
      }
    })
  }
  createTicket(data: Ticket){
    const ticket = {
      storyId: this.userstoryId,
      title: data.title,
      assignedUserId: this.assignedUserId,
      description: data.description
    }
    this.ticketService.createDbTicket(ticket).subscribe({
      next: data => {
        if(data.status == "Success"){
          this.commonService.updateAlert({status: AlertType.Success, msn: data.msn})
        }else{
          this.commonService.updateAlert({status: AlertType.Danger, msn: data.msn})
        }
        this.alertMsg = data.msn
      },error: e => {
        console.log(e)
        this.commonService.updateAlert({status: AlertType.Danger, msn: e.message})
      }
    })
  }
  deleteTicket(tickedId: string){
    this.warningMsg = "desea borrar el ticket"
    this.ticketIdToDelete = tickedId
    this.showModal = true
    
  }
  deleteConfirm(){
    this.warningMsg =""
    this.showModal = false
    this.ticketService.deleteTicket(this.ticketIdToDelete).subscribe({
      next: data => {
        if(data.status == "Success"){
          this.commonService.updateAlert({status: AlertType.Success, msn: data.msn})
        }else{
          this.commonService.updateAlert({status: AlertType.Danger, msn: data.msn})
        }
        this.alertMsg = data.msn
      },error: e => {
        console.log(e)
        this.commonService.updateAlert({status: AlertType.Danger, msn: e.message})
      },
    })
  }
}
