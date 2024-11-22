import { Component, OnInit } from '@angular/core';

import { PublicRoutes } from '../../public.routes';
import { Router } from '@angular/router';
import { pageTransition } from '../../../shared/utils/animations';
import { Images } from '../../../../assets/data/images';

import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { RegistrationResponse } from '../auth-models';
import { DatetimeHelper } from '../../../../common/helpers/datetime.helper';
import { AlertType } from '../../../shared/alert/alert.type';
import { CommonService } from '../../../../services/common.service';
import { CompanyService } from '../../../../services/company.service';
import { Company } from '../../../../models/company';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [pageTransition]
})
export class SignupComponent implements OnInit {

  readonly signupbannerImage:string = Images.auth.signup
  isLoading: boolean = false;
  readonly currentYear: number = DatetimeHelper.currentYear;
  readonly publicRoutes = PublicRoutes;
  showErrors = false
  readonly alertType = AlertType;
  alert = this.alertType.Info
  showAlert = false
  alertMsg = ""
  signUpForm: FormGroup
  companies: Company[] = []
  companyIdSelected: string = "" 
  showCompanyError = false
 
  constructor(
    public commonService: CommonService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private companyService: CompanyService
  ) { 
    this.signUpForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      repassword: ['', [this.passwordValidator(), Validators.required]],
    });
  
  }
  ngOnInit(): void {
    this.getCompanies()
  }

  onFormSubmitHandler = (event: SubmitEvent) => {
    this.showCompanyError = this.companyIdSelected === ""
    event.preventDefault();
    console.log(this.signUpForm.valid && this.companyIdSelected != "")
    if(this.signUpForm.valid && this.companyIdSelected != ""){
        this.register()
    }else{
      this.showErrors = true
    }
  
    // this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
      this.showErrors = false
      this.showCompanyError = false
      //this.router.navigate([AppRoutes.Admin, AdminRoutes.Dashboard]);
    }, 3000);
  }
  register(){
    const register: RegistrationResponse = {
      username: this.signUpForm.value.username,
      password: this.signUpForm.value.password,
      email: this.signUpForm.value.email,
      companyId: this.companyIdSelected,
    }
    this.authService.signUp(register).subscribe({
      next: data => {
          if(data.status == "Success"){
            this.commonService.updateAlert({status: AlertType.Success, msn: data.msn})
            this.router.navigate(["signin"])
          }else{
            this.commonService.updateAlert({status: AlertType.Danger, msn: data.msn})
          }
         

      },error: e => {
        this.commonService.updateAlert({status: AlertType.Danger, msn: e.message})
      }
    })
  }
   passwordValidator():  ValidationErrors|  null {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const contraseña = control.parent?.get('password');
      const confirmar = control.parent?.get('repassword');
  
      if (!contraseña || !confirmar) {
        return null;
      }
  
      return contraseña.value === confirmar.value ? null : { confirmPassword: true };
    };
}

getCompanies(){
  this.companyService.getAllCompanies().subscribe({
    next: data => this.companies = data,
    error: e => console.log(e)
  })
}
showCompanies() {
  this.getCompanies()
  }
}