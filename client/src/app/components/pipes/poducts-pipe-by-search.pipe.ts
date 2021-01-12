import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/models/Product';

@Pipe({
  name: 'poductsPipeBySearch'
})
export class PoductsPipeBySearch implements PipeTransform {

  transform(products: Product[], name: string): any {

    return products.filter(product => product.productName.toLowerCase().includes(name.toLowerCase()));
  }

}

