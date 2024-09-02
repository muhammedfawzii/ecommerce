import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { AllordersService } from '../../core/services/allorders.service';
import { AuthService } from '../../core/services/auth.service';
import { IAllorders } from '../../core/interfaces/iallorders';
import { CurrencyPipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit , OnDestroy {
private readonly _AllordersService = inject(AllordersService)
private readonly _AuthService = inject(AuthService)
userCart:WritableSignal<IAllorders[]> = signal([])
allOrdersUnsub!:Subscription

ngOnInit(): void {
 let userId =  this._AuthService.saveUserToken()
 console.log(userId.id);

this.allOrdersUnsub =  this._AllordersService.getUserCart(userId.id).subscribe({
  next:(res)=>{
    console.log(res);
    this.userCart.set(res)
  },
  error:(err)=>{
    console.log(err);
    
  }
 })
 
}
ngOnDestroy(): void {
  this.allOrdersUnsub?.unsubscribe()
}
}
