import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class PipeCuadroNecesidadesPipe implements PipeTransform {

  transform(cn: any, search: any): any {
    if (search === undefined) return cn;
    return cn.filter(function (cne) {
      return cne.denominacion.toLowerCase().includes(search.toLowerCase());
    });
  }

}
