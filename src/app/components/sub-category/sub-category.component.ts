import { Component, inject, OnInit } from '@angular/core';
import { SubCategoryService } from '../../core/services/sub-category.service';
import { ActivatedRoute } from '@angular/router';
import { ISubCateg } from '../../core/interfaces/isub-categ';

@Component({
  selector: 'app-sub-category',
  standalone: true,
  imports: [],
  templateUrl: './sub-category.component.html',
  styleUrl: './sub-category.component.scss'
})
export class SubCategoryComponent implements OnInit {
private readonly _SubCategoryService = inject(SubCategoryService)
private readonly _ActivatedRoute = inject(ActivatedRoute)
categId:string | null = null
categoryList:ISubCateg[] = []
text:string = ""
ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(p)=>{
      console.log(p.get('id'));
      this.categId = p.get('id')
    }
  })
  this._SubCategoryService.getAllSubCategories(this.categId).subscribe({
    next:(res)=>{
      if(res.data.length > 0){
        console.log(res.data);
        this.categoryList = res.data
      }else{
        this.text = 'undefined'
      }
      
    }
  })
}
}
