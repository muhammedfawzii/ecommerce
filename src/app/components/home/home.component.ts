import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/product';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategories } from '../../core/interfaces/icategories';

import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../core/pipes/search.pipe';
import {
  CurrencyPipe,
  DatePipe,
  JsonPipe,
  LowerCasePipe,
  UpperCasePipe,
} from '@angular/common';
import { TexttermPipe } from '../../core/pipes/textterm.pipe';
import { FormsModule } from '@angular/forms';
import { HeartclickDirective } from '../../core/directive/heartclick.directive';
import { WishlistService } from '../../core/services/wishlist.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import {
  TranslateModule,
  TranslatePipe,
  TranslateService,
} from '@ngx-translate/core';
import { IWishlist } from '../../core/interfaces/iwishlist';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    CarouselModule,
    TranslateModule,
    HeartclickDirective,
    CurrencyPipe,
    FormsModule,
    SearchPipe,
    TexttermPipe,
    JsonPipe,
    DatePipe,
    LowerCasePipe,
    UpperCasePipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _WishlistService = inject(WishlistService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  readonly _TranslateService = inject(TranslateService);
  homeUnsub!: Subscription;
  categUnsub!: Subscription;
  categoryList: WritableSignal<ICategories[]> = signal([]);
  userWishlist: IWishlist[] = [];
  productList: WritableSignal<Product[]> = signal([]);
  data: WritableSignal<string> = signal('');
  wishlistIds: Signal<string[]> = computed(() =>
    this._WishlistService.wishListid()
  );

  customOptionsCateg: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    rtl: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 2000,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
  };

  customOptionsMain: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    rtl: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 2000,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true,
  };

  ngOnInit(): void {
    this.categUnsub = this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res);
        this.categoryList.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.homeUnsub = this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        this.productList.set(res.data);

        console.log(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });

    this._WishlistService.getWishList().subscribe({
      next: (res) => {
        console.log(res);

        this._WishlistService.wishListid.set(
          res.data.map((item: any) => item._id)
        );
        console.log(this.wishlistIds());
      },
    });
  }
  ngOnDestroy(): void {
    this.homeUnsub?.unsubscribe();
    this.categUnsub?.unsubscribe();
  }
  addToCart(id: string): void {
    this._CartService.addProductsToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message, 'fresh Cart');
        this._CartService.count.set(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addToWishList(id: string): void {
    this._WishlistService.addProductsToWishlist(id).subscribe({
      next: (res) => {
        this._WishlistService.wishListid.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  deleteWishlist(id: string): void {
    this._WishlistService.rempveProductFromWishList(id).subscribe({
      next: (res) => {
        this._WishlistService.wishListid.set(res.data);
      },
    });
  }

  getTranslatedName(name: string): string {
    return this._TranslateService.instant(name);
  }
}
