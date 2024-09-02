import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategories } from '../../core/interfaces/icategories';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit , OnDestroy {
private readonly _CategoriesService = inject(CategoriesService)
private readonly _CartService = inject(CartService)
categoryList:WritableSignal<ICategories[]> = signal([])
categUnsub!:Subscription
ngOnInit(): void {
 this.categUnsub =  this._CategoriesService.getAllCategories().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.categoryList.set(res.data)
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}
ngOnDestroy(): void {
  this.categUnsub?.unsubscribe()
}
}
