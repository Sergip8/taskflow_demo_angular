import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PublicRoutes } from '../../public.routes';
import { pageTransition } from '../../../shared/utils/animations';
import { Images } from '../../../../assets/data/images';


import { AuthService } from '../auth.service';
import { LoginRequest, LoginResponse } from '../auth-models';
import { CommonService } from '../../../../services/common.service';
import { DatetimeHelper } from '../../../../common/helpers/datetime.helper';
import { AlertType } from '../../../shared/alert/alert.type';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  animations: [pageTransition],
})
export class SigninComponent {
  readonly signinBannerImage: string = Images.bannerLogo;

  isLoading: boolean = false;
  readonly publicRoutes = PublicRoutes;
  readonly currentYear: number = DatetimeHelper.currentYear;

  serverErrors: string[] = [];
  showErrors = false
  readonly alertType = AlertType;
  alert = this.alertType.Info
  showAlert = false
  alertMsg = ""

  @Output() loginSuccess = new EventEmitter<void>()


  signInForm: FormGroup

  constructor(
    public commonService: CommonService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.signInForm = this.formBuilder.group({
      email: ['',Validators.required],
      password: ['', Validators.required],
    });
  }
  protected readonly AlertType = AlertType;

  protected onFormSubmitHandler = (event: SubmitEvent) => {
    if(this.signInForm.valid){
      this.login()
  }else{
    this.showErrors = true
  }
    // event.preventDefault();
    // this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
      this.showErrors = false
      //this.router.navigate([AppRoutes.Admin, AdminRoutes.Dashboard]);
    }, 3000);
  };

  protected onAlertCloseHandler = (e: any) => {
    this.serverErrors = [];
  };
  login(){
    
    this.authService.signIn(<LoginResponse>this.signInForm.value).subscribe({
      next: data => {
        console.log(data)
          if(data.status == "Success"){
            this.authService.updateUser(<LoginRequest>data.data)
            this.commonService.updateAlert({status: AlertType.Success, msn: data.msn})
            this.router.navigate([""])
            
          }else{
            this.commonService.updateAlert({status: AlertType.Danger, msn: data.msn})
          }
          

      },error: e => {
        this.commonService.updateAlert({status: AlertType.Danger, msn: e.message})
      }
    })
  }

}
