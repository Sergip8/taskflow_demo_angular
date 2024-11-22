import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
  
})
export class PublicComponent {

  constructor(public authService: AuthService){
   authService.user$.subscribe(u =>{
    this.showDashboard = u != null
   })
      
    
  }
  showDashboard = false
  
}
