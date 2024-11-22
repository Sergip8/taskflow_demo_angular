
import { 
    Directive, 
    ElementRef, 
    EventEmitter, 
    HostListener, 
    Output 
  } from '@angular/core';
  
  @Directive({
    selector: '[clickOutside]',
    standalone: true
  })
  export class ClickOutsideDirective {
  
    @Output() 
    clickOutside: EventEmitter<void> = new EventEmitter();
  
    @HostListener('document:click', ['$event']) 
    onDocumentClick(event: PointerEvent) {
      const nativeElement: any = this.elementRef.nativeElement;
      const clickedInside: boolean = nativeElement.contains(event.target);
      if (!clickedInside) {
        console.log("click outside")
        this.clickOutside.emit();
      }
    }
  
    constructor(private elementRef: ElementRef) { }
  
  }