import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../core/interfaces/product';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategories } from '../../core/interfaces/icategories';
import { BrandsService } from '../../core/services/brands.service';
import { IBrands } from '../../core/interfaces/ibrands';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  private readonly _ProductsService = inject(ProductsService)
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _CategoriesService = inject(CategoriesService)
  private readonly _BrandsService = inject(BrandsService)
  private readonly _CartService = inject(CartService)
  detailsProducts:Product | null = null
  detailsCateg:ICategories | null = null
  detailsBrands:IBrands | null  = null

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
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  
  ngOnInit(): void {



    this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
    console.log(p.get('id'));
    let idProduct = p.get('id')

    this._BrandsService.getSpecificBrands(idProduct).subscribe({
      next:(res)=>{
        console.log(res.data);
        this.detailsBrands = res.data
      },
      error:(err)=>{
        console.log(err);  
      }
    })

        this._ProductsService.getSpecificProducts(idProduct).subscribe({
          next:(res)=>{
            console.log(res.data);
            this.detailsProducts = res.data
          },
          error:(err)=>{
            console.log(err);
            
          }
        })

        this._CategoriesService.getSpecificCategories(idProduct).subscribe({
          next: (res)=>{
            console.log(res.data);
            this.detailsCateg = res.data
          },
          error:(err)=> {
            console.log(err);
            
          },
        })
      }
    })
  }
  addToCart(id:string):void{
    this._CartService.addProductsToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        this._CartService.count.set(res.numOfCartItems)
      }
    })
  }

}
