import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalComponent } from './modal.component';
import { ClickOutsideDirective } from '../directives/click-outside.directive';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModalComponent,
  ],
  exports: [ModalComponent]
})
export class ModalModule { }
