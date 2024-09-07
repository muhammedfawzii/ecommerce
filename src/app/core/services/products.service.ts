import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
 _HttpClient = inject(HttpClient)
  constructor() { }

  getAllProducts():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products`)
  }
  getAllProductsExtra():Observable<any>{
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/products?page=2`)
  }
  getSpecificProducts(id:string | null):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
}
