import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {SigninComponent} from "./signin/signin.component";
import {SignupComponent} from "./signup/signup.component";
import {ReactiveFormsModule} from "@angular/forms";
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { AlertComponent } from '../../shared/alert/alert.component';
import { ValidationErrorComponent } from '../../shared/validation-error/validation-error.component';



@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent
  ],
  imports: [
    ValidationErrorComponent,
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SpinnerComponent,
    AlertComponent,
  ],
  exports: [
    SigninComponent,
    SignupComponent,
  ],
 
})
export class AuthModule { }
