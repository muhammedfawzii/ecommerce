import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHeartclick]',
  standalone: true
})
export class HeartclickDirective {

  constructor(private el:ElementRef) { }

  @HostListener('click') click(){
    this.el.nativeElement.style.color = 'red'
  }

}
