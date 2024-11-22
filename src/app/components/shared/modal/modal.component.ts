import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild, inject } from '@angular/core';
import { ClickOutsideDirective } from '../directives/click-outside.directive';


@Component({
  standalone: true,
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  imports: [CommonModule, ClickOutsideDirective]
})
export class ModalComponent {
 
  //private elementRef = inject(ElementRef)
 
  
  @Input() show: boolean = false;
  @Input() title: string = "Modal";
  @Input() size: string = "xl:max-w-7xl";
  @Input() footer: boolean = true;
  
  
  
  
  @Output() closeModal = new EventEmitter<boolean>();

  onModalClose() {
    this.closeModal.emit(false);
  }

}
