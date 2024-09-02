import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/icart';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { TexttermPipe } from '../../core/pipes/textterm.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { HeartclickDirective } from '../../core/directive/heartclick.directive';
import { WishlistService } from '../../core/services/wishlist.service';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink , CurrencyPipe , TexttermPipe , SearchPipe , FormsModule , HeartclickDirective],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit , OnDestroy {
private readonly _ProductsService  = inject(ProductsService)
private readonly _WishlistService = inject(WishlistService)
private readonly _CartService = inject(CartService)
private readonly _ToastrService = inject(ToastrService)
productList:WritableSignal<Product[]> = signal([])
data:string = ""
productUnsub!:Subscription

ngOnInit(): void {
 this.productUnsub =  this._ProductsService.getAllProducts().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.productList.set(res.data)
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}
addToWishList(id:string):void{
this._WishlistService.addProductsToWishlist(id).subscribe({
  next:(res)=>{
    console.log(res);  
  },
  error:(err)=>{
    console.log(err);
  }
})
}
addToCart(id:string):void{
this._CartService.addProductsToCart(id).subscribe({
  next:(res)=>{
    console.log(res.data);
    this._ToastrService.success(res.message , 'FreshCart')
    this._CartService.count.set(res.numOfCartItems)
  }
})
}
ngOnDestroy(): void {
  this.productUnsub?.unsubscribe()
}
}
