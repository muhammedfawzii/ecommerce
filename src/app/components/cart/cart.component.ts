import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ICart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit, OnDestroy {
  private readonly _CartService = inject(CartService);
  cartDetails: WritableSignal<ICart> = signal({} as ICart);
  disabledBtn: boolean = false;
  cartUnsub!: Subscription;

  ngOnInit(): void {
    this.cartUnsub = this._CartService.getCartProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartDetails.set(res.data);
        if (res.data.products == 0) {
          this.disabledBtn = true;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeItem(id: string): void {
    this._CartService.deleteSpecificCartItem(id).subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails.set(res.data);
        if (res.numOfCartItems === 0) {
          this.disabledBtn = true;
        }
        this._CartService.count.set(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  updateItemQuantity(id: string, count: number): void {
    this._CartService.updateProductQuantity(id, count).subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartDetails.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  alertBeforeDelete() {
    Swal.fire({
      title: 'Are you sure you want to clear the cart?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      customClass: {
        title: 'swatTitle',
      },
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      console.log(result);

      if (result.isConfirmed) {
        this.clearCart();

        this.disabledBtn = true;
      }
    });
  }

  clearCart(): void {
    this._CartService.clearProductCart().subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails.set({} as ICart);
        this._CartService.count.set(0);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnDestroy(): void {
    this.cartUnsub?.unsubscribe();
  }
}
