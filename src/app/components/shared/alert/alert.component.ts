import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertType } from "./alert.type";
import { slideDown } from '../utils/animations';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  animations: [slideDown]
})
export class AlertComponent implements OnChanges {
  @Input() message: string = "";
  @Input() type: AlertType = AlertType.Success;
  @Input() dismissible: boolean = false;
  //@Input() show: boolean = false;

  @Output() hideAlert = new EventEmitter<boolean>();

  @ViewChild("alertElement", { static: false }) alertElement!: ElementRef;
  show: boolean = false; // Controla si se muestra la alerta
  private timeoutId: any;
  duration = 3000
  constructor(private elementRef: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
      console.log (changes)
      if(changes["message"].currentValue)
        this.showAlert();
    
  }

  private showAlert(): void {
    this.show = true;

    // Limpiamos el temporizador previo si ya existía
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    // Ocultamos la alerta después del tiempo especificado
    this.timeoutId = setTimeout(() => {
      this.show = false;
    }, this.duration);
  }

  protected alertTypeClass(): string {
    let elemClass: string;

    switch (this.type) {
      case AlertType.Success:
        elemClass = "alert-success";
        break;
      case AlertType.Danger:
        elemClass = "alert-danger";
        break;
      case AlertType.Info:
        elemClass = "alert-info";
        break;
      default:
        elemClass = "alert-warning";
    }

    return elemClass;
  }

  protected dismissHandler(): void {
    this.show = false;
    this.hideAlert.emit(this.show);
  }
}
