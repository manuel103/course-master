import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundUp'
})
export class RoundUpPipe implements PipeTransform {

  transform(value: number): number {
    if (!value) {
      return value;
    }
    return Math.ceil(value * 100) / 100;
  }

}
