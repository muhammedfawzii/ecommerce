import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(arrData:any[] , word:string): any[] {
    return arrData.filter((item)=> item.title.toLowerCase().includes(word.toLocaleLowerCase()));
  }

}
