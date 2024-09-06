import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../core/interfaces/product';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategories } from '../../core/interfaces/icategories';
import { BrandsService } from '../../core/services/brands.service';
import { IBrands } from '../../core/interfaces/ibrands';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  private readonly _ProductsService = inject(ProductsService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _BrandsService = inject(BrandsService);
  private readonly _CartService = inject(CartService);
  private readonly _WishlistService = inject(WishlistService);
  detailsProducts: Product | null = null;
  detailsCateg: ICategories | null = null;
  detailsBrands: IBrands | null = null;
  wishlistIds: Signal<string[]> = computed(() =>
    this._WishlistService.wishListid()
  );

  customOptionsDetailsProduct: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
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
        items: 4,
      },
    },
    nav: true,
  };

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        console.log(p.get('id'));
        let idProduct = p.get('id');

        this._BrandsService.getSpecificBrands(idProduct).subscribe({
          next: (res) => {
            console.log(res.data);
            this.detailsBrands = res.data;
          },
          error: (err) => {
            console.log(err);
          },
        });
        this._WishlistService.getWishList().subscribe({
          next: (res) => {
            this._WishlistService.wishListid.set(
              res.data.map((item: any) => item._id)
            );
          },
        });

        this._ProductsService.getSpecificProducts(idProduct).subscribe({
          next: (res) => {
            console.log(res.data);
            this.detailsProducts = res.data;
          },
          error: (err) => {
            console.log(err);
          },
        });

        this._CategoriesService.getSpecificCategories(idProduct).subscribe({
          next: (res) => {
            console.log(res.data);
            this.detailsCateg = res.data;
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
    });
  }
  addToCart(id: string): void {
    this._CartService.addProductsToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this._CartService.count.set(res.numOfCartItems);
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
}
