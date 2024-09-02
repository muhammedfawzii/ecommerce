import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private _HttpClient:HttpClient) { }

  myHeaders:any = {token:localStorage.getItem('userToken')}
  checkOut(id:string | null , shippingData:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200` , 
      {
        "shippingAddress": shippingData
      },
      {
        headers:this.myHeaders
      }
    )
  }
  payCash(id:string | null , shippingData:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/${id}` , 
      {
        "shippingAddress":shippingData
      } , 
      {
        headers:this.myHeaders
      }
    )
  }
}
