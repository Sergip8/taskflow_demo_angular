import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent {
  title = 'event-bud-frontend';

  constructor(private element: ElementRef, private rendered: Renderer2) { }

  @HostListener('click', ['$event.target']) onClick(e: Element) {
    const profileDropdown = this.element.nativeElement.querySelector('.profile-dropdown') as Element;

    if (!profileDropdown.contains(e)) {
      const profileDropdownList = this.element.nativeElement.querySelector('.profile-dropdown-list');
      this.rendered.setAttribute(profileDropdownList, 'aria-expanded', 'false')
    }
  }
}
