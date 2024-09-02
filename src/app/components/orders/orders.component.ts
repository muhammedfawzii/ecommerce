import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit , OnDestroy {
private readonly _OrdersService = inject(OrdersService)
private readonly _ActivatedRoute = inject(ActivatedRoute)
private readonly _FormBuilder = inject(FormBuilder)
private readonly _Router = inject(Router)
isLoading:boolean = false
ordersUnsub!:Subscription

cartId:string | null = ""
 orders:FormGroup = this._FormBuilder.group({
  details:[null , [Validators.required]],
  phone:[null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]],
  city:[null , [Validators.required , Validators.pattern(/^[A-Za-z]{4,}$/)]]
 })

 ngOnInit(): void {
   this._ActivatedRoute.paramMap.subscribe({
    next:(p)=>{
      console.log(p.get('id'));
      this.cartId = p.get('id')
    }
   })
 }

 ordersSubmit():void{
  if(this.orders.valid){
 this.ordersUnsub =    this._OrdersService.checkOut(this.cartId , this.orders.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status == 'success'){
          this.isLoading = true
          window.open(res.session.url , '_self')
        }
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }else{
    this.orders.markAllAsTouched()
  } 
 }
 cashPayment():void{
  if(this.orders.valid){
    this._OrdersService.payCash(this.cartId , this.orders.value).subscribe({
      next:(res)=>{
        console.log(res);
        this._Router.navigate(['/allorders'])
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
 }
 ngOnDestroy(): void {
   this.ordersUnsub?.unsubscribe()
 }
}
