import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeSymbols'
})
export class RemoveSymbolsPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value?.replace(/[^\d.-]/g, '');
  }
}
