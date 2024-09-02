import { Component, computed, inject, OnInit, Signal, ViewChild, ElementRef, HostListener, viewChild } from '@angular/core';

import { AuthService } from '../../core/services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { MytranslateService } from '../../core/services/mytranslate.service';
import { HeartclickDirective } from '../../core/directive/heartclick.directive';


@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink , RouterLinkActive , TranslateModule , HeartclickDirective],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit {
 _AuthService = inject(AuthService)
 private readonly _CartService = inject(CartService)
 private readonly _MytranslateService = inject(MytranslateService)
 readonly _TranslateService = inject(TranslateService)

cartNum:Signal<number> = computed(()=> this._CartService.count())

ngOnInit(): void {
  this._CartService.getCartProducts().subscribe({
    next:(res)=>{
      this._CartService.count.set(res.numOfCartItems)
    }
  })
}
change(lang:string){
  this._MytranslateService.changeLang(lang)
  
}
@ViewChild('scroll') el!:ElementRef
@HostListener('window:scroll') onScroll(){
  if(scrollY > 50){
  this.el.nativeElement.style.paddingBlock = '20px'
  this.el.nativeElement.style.backgroundColor = 'black'
   
  }else{
  this.el.nativeElement.style.paddingBlock = '14px'
  this.el.nativeElement.style.backgroundColor = 'grey'
  }
}

}
