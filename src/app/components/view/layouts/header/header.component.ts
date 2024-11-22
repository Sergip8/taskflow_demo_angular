import { Component, ElementRef, Renderer2 } from '@angular/core';

import { NavigationExtras, Router } from '@angular/router';
import { AppRoutes } from '../../../../app.routes';
import { ViewRoutes } from '../../view.routes';
import { CommonService } from '../../../../services/common.service';
import { SearchService } from '../../../../services/search.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {


  //public userOne: string = Images.users.userOne;
  
  isOpen: boolean = false;
  searchRes = []

  readonly appRoutes = AppRoutes;
  readonly adminRoutes = ViewRoutes;
  constructor(private element: ElementRef, 
    public readonly commonServices: CommonService,
    private renderer: Renderer2, 
    private searchService: SearchService, 
    private router: Router
  ) {}

  onClickProfile = () => {
    const profileDropdownList = this.element.nativeElement.querySelector(
      '.profile-dropdown-list'
    );
    this.renderer.setAttribute(profileDropdownList, 'aria-expanded', 'true');
  };

  search(searchString: string) {
    // this.router.navigate(
    //   [this.commonServices.prepareRoute(this.appRoutes.Project, this.adminRoutes.SearchTableRes)], 
    //   { queryParams: {"q": searchString}});
   
    }

  selected(idSelected: string) {
    
  }

}
