import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textterm',
  standalone: true
})
export class TexttermPipe implements PipeTransform {

  transform(text:string, value:number): string {
    return text.split(" ", value).join(" ");
  }

}
