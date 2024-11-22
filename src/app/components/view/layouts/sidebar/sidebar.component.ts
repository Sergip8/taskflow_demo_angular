import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ViewRoutes, ElementRoutes, SettingRoutes } from '../../view.routes';
import { AppRoutes } from '../../../../app.routes';
import { CommonService } from '../../../../services/common.service';
import { ProjectService } from '../../../../services/project.service';
import { AuthService } from '../../../public/auth/auth.service';
import { Project } from '../../../../models/project';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {
  sidebarIsCollapsed: boolean = true;
  readonly appRoutes = AppRoutes;
  readonly adminRoutes = ViewRoutes;
  readonly settingRoutes = SettingRoutes;
  readonly elementRoutes = ElementRoutes;
  private routerSubscription: Subscription = new Subscription();
  projects: Project[] = []

  @Output() sidebarCollapsed = new EventEmitter<boolean>();
rotateArrow: string[] = []

  constructor(
    public readonly commonServices: CommonService,
    private readonly elementRef: ElementRef,
    private authService: AuthService,
    private projectService: ProjectService,
    private router: Router) { }

  ngOnInit(): void {
    this.getProjects()
      console.log(this.projects)
  }

  ngAfterViewInit(): void {
    this.subMenuToggleHandlerOnRouteChange();
    setTimeout(() => { this.subMenuToggleHandlerOnPageReload() }, 1);
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  subMenuToggleHandler = (event: MouseEvent, item: string): void => {
    if(item == "projects") 
    {
      
    }
    const i = this.rotateArrow.indexOf(item)
      if(i == -1){
        this.rotateArrow.push(item)
      }else{
        this.rotateArrow.splice(i,1)
      }
    
    const elem = event.target as HTMLElement;
    const subMenu = elem.closest("a.sub-menu") as Element;
    
    if (subMenu.getAttribute('aria-expanded') == 'false')
      subMenu.setAttribute('aria-expanded', 'true');
    else
      subMenu.setAttribute('aria-expanded', 'false');
  }

  subMenuToggleHandlerOnPageReload = (): void => {
    
    const elem = this.elementRef.nativeElement.querySelector('[aria-current="page"]')
      ?.closest('ul.sub-menu-item') as Element;

    const subMenu = elem?.previousSibling as Element;

    subMenu?.setAttribute('aria-expanded', 'true');
  }

  subMenuToggleHandlerOnRouteChange = (): void => {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const subMenu = this.elementRef.nativeElement.querySelectorAll(".sub-menu");
        const elem = this.elementRef.nativeElement.querySelector(`[href='${event.url}']`) as Element;

        if (elem?.closest('ul.sub-menu-item')) return;

        subMenu.forEach((subMenu: Element) => {
          if (subMenu.getAttribute('aria-expanded') == 'true')
            subMenu.setAttribute('aria-expanded', 'false');
        });
      }
    })
  }
  getProjects(){
    const companyId = this.authService.getCompanyId()
    if(companyId){
      this.projectService.getCompanyProjects(companyId).subscribe({
        next: data => this.projects = data,
        error: e => console.log(e)
      })
    }
  }
}
