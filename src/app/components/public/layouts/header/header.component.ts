import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { PublicRoutes } from '../../public.routes';
import { Images } from '../../../../assets/data/images';

import { NgIf } from '@angular/common';
import { AppRoutes } from '../../../../app.routes';
import { ViewRoutes } from '../../../view/view.routes';
import { CommonService } from '../../../../services/common.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'public-header',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class PublicHeaderComponent implements OnInit {

  showDashboard = false
  cart: number = 0 
  private router = inject(Router)
  public mainLogo: string = Images.mainLogo;
  readonly publicRoutes = PublicRoutes;
  readonly appRoutes = AppRoutes;
  readonly adminRoutes = ViewRoutes;
  private token: string | null = null
  constructor( public readonly commonService: CommonService, public authService: AuthService) {

  }
  async ngOnInit() {
    this.token = this.authService.getToken()
    this.showDashboard = this.token != null
  }

  search(value: string){
      this.router.navigate([this.publicRoutes.ProductSearch+ "/" +value])
  }
  

}
