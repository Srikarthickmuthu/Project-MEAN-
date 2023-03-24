import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sum',
})
export class SumPipe implements PipeTransform {
  transform(items: any[], attr: string  ): string {
    return items.reduce((a, b , c) => a + b[attr], 0);
  }
}
