import { Pipe, PipeTransform } from '@angular/core';
import {CommonModule} from "@angular/common";

@Pipe({
  name: 'shortentext'
})
export class ShortentextPipe implements PipeTransform {

  transform(text: string, lengthMax = 200): unknown {
    
      let newText

      if(text.length > 200){
        newText = text.slice(0, lengthMax) + '(...)';
      }
      else{
        newText = text
      }

    
    return newText;
  }

}
