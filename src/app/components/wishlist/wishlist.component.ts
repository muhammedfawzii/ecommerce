import { CurrencyPipe, SlicePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { TexttermPipe } from '../../core/pipes/textterm.pipe';
import { WishlistService } from '../../core/services/wishlist.service';
import { IWishlist } from './../../core/interfaces/iwishlist';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [SlicePipe , TexttermPipe , CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit , OnDestroy{
private readonly _WishlistService = inject(WishlistService)

userWishlist:WritableSignal<IWishlist[]>= signal([])
wishListUnsub!:Subscription
ids:string[] = []  

ngOnInit(): void {


this.wishListUnsub = this._WishlistService.getWishList().subscribe({
    next:(res)=>{
      console.log(res.data);
      
      this.userWishlist.set(res.data)
     this.ids = res.data.map((item:any)=> item.id)
      console.log(this.ids)
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}

removeProduct(id:string):void{


  this._WishlistService.rempveProductFromWishList(id).subscribe({
    next:(res)=>{
      console.log(res);
      this._WishlistService.getWishList().subscribe({
        next:(res)=>{
          console.log(res);
          this.userWishlist.set(res.data)
        }
      })
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}
ngOnDestroy(): void {
  this.wishListUnsub?.unsubscribe()
}
}
