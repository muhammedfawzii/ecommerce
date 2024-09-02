import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient :HttpClient) { }
myHeaders:any = {token: localStorage.getItem('userToken') }

count:WritableSignal<number> = signal(0)


  addProductsToCart(id:string | null):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart` , 
      {
        "productId": id
      },
      
    )
  }
  getCartProducts():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart` , 
      
    )
  }

  deleteSpecificCartItem(id:string):Observable<any>{
  return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , 
      
    )
  }

  updateProductQuantity(id:string , newCount:number):Observable<any>{
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
      {
        "count": newCount
      },
      {
        headers: this.myHeaders
      }
    )
  }
  clearProductCart():Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart` , 
      
    )
  }
}
