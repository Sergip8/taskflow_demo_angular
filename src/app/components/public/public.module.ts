import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './home/home.component';
import { PublicFooterComponent } from './layouts/footer/footer.component';
import { PublicHeaderComponent } from './layouts/header/header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { LayoutsModule } from "../view/layouts/layouts.module";
import { ValidationErrorComponent } from '../shared/validation-error/validation-error.component';



@NgModule({
  declarations: [PublicComponent, PageNotFoundComponent, HomeComponent],
  imports: [

    CommonModule,
    PublicRoutingModule,
    AuthModule,
    PublicHeaderComponent,
    PublicFooterComponent,
    RouterOutlet,
    LayoutsModule
],

})
export class PublicModule {}
