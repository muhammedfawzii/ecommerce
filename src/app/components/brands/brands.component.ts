import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { IBrands } from '../../core/interfaces/ibrands';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit , OnDestroy {
private readonly _BrandsService = inject(BrandsService)
detailsBrands:IBrands | null = null
brands:WritableSignal<IBrands[]> = signal([])
brandsUnsub!:Subscription


ngOnInit(): void {
 this.brandsUnsub =  this._BrandsService.getBrands().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.brands.set(res.data)
    },
    error:(err)=>{
      console.log(err); 
    }
  })
}
getSpecificBrand(id:string):void{
  this._BrandsService.getSpecificBrands(id).subscribe({
    next:(res)=>{
      console.log(res.data);
      this.detailsBrands = res.data
    }
  })
}
ngOnDestroy(): void {
  this.brandsUnsub?.unsubscribe()
}
}
