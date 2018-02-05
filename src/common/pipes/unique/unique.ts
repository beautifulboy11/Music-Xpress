import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unique',
})
export class UniquePipe implements PipeTransform {

  transform(value: string, ...args) {
     return value.toLowerCase();
  }

  // GetUnique(items: any, filterOn: any) {

  //   if (filterOn === false) {
  //     return items;
  //   }

  //   if ((filterOn || filterOn === undefined)) {
  //     var hashCheck = {}, newItems = [];

  //     var extractValueToCompare = function (item) {
  //       if (item.isObject && filterOn.isString) {
  //         return item[filterOn];
  //       } else {
  //         return item;
  //       }
  //     };

  //     items.forEach((item) => {
  //       var valueToCheck, isDuplicate = false;

  //       for (var i = 0; i < newItems.length; i++) {
  //         if (extractValueToCompare(newItems[i]) === extractValueToCompare(item)) {
  //           isDuplicate = true;
  //           break;
  //         }
  //       }
  //       if (!isDuplicate) {
  //         newItems.push(item);
  //       }

  //     });
  //     items = newItems;
  //   }
  //   return items;
  // };
}



