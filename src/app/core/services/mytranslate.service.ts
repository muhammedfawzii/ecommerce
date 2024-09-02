import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, RendererFactory2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MytranslateService {
  private readonly _TranslateService = inject(TranslateService)
  private readonly _PLATFORM_ID = inject(PLATFORM_ID)
  private readonly _RendererFactory2 = inject(RendererFactory2).createRenderer(null , null)

  constructor() { 
if(isPlatformBrowser(this._PLATFORM_ID)){
    this._TranslateService.setDefaultLang('en')
    this.changeDirection()
}
  
  }
  changeDirection():void{
    let savedlang = localStorage.getItem('lang')
    if(savedlang !== null){
      this._TranslateService.use(savedlang !)
    }
    if(savedlang === "en"){
      document.documentElement.dir = 'ltr'
      this._RendererFactory2.setAttribute(document.documentElement , 'dir' , 'en')
      this._RendererFactory2.setAttribute(document.documentElement , 'lang' , 'en')
    }
    else if(savedlang === "ar"){
      document.documentElement.dir = 'rtl'
      this._RendererFactory2.setAttribute(document.documentElement , 'dir' , 'ar')
      this._RendererFactory2.setAttribute(document.documentElement , 'lang' , 'ar')
    }
  }

  changeLang(lang:string){
    if(isPlatformBrowser(this._PLATFORM_ID)){
      localStorage.setItem('lang' , lang)
      this.changeDirection()
    }
  }
}
