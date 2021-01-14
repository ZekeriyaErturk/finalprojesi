import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], search: string): any[] {
    if (!items) {
      return [];
    }
    if (!search) {
      return items;
    }

    return items.filter((item) => {
      let control = false;
      for (let val in item) {
        if (item[val].toString().toLowerCase().includes(search)) control = true;
      }
      if (control) return true;
      else return false;
    });
  }
}
