import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlertComponent } from "./components/shared/alert/alert.component";
import { CommonService } from './services/common.service';
import { AlertType } from './components/shared/alert/alert.type';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  alert: AlertType  = AlertType.Info
  message = ""
  constructor(public commonservice: CommonService){
    commonservice.alert$.subscribe(a =>{
      this.alert = a?.status || AlertType.Info
      this.message = a?.msn || ""
    })
  }
  title = 'angular-taskflow';
}
