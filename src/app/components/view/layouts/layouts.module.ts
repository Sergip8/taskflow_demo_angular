import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';

import { SidebarCollapseDirective } from './sidebar/sidebar-collapse.directive';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ClickOutsideDirective } from '../../shared/directives/click-outside.directive';




@NgModule({
  declarations: [
    SidebarComponent,
    FooterComponent,
    HeaderComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    SidebarCollapseDirective
  
    
    
],
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
  ]
})
export class LayoutsModule { }
