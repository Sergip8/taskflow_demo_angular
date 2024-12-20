import { Component } from '@angular/core';
import {PublicRoutes} from "../public.routes";
import { CommonService } from '../../../services/common.service';
import { AppRoutes } from '../../../app.routes';
import { ViewRoutes } from '../../view/view.routes';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  readonly publicRoutes = PublicRoutes;

  constructor(public readonly commonService: CommonService) {
  }

  protected readonly AppRoutes = AppRoutes;
  protected readonly AdminRoutes = ViewRoutes;
}
