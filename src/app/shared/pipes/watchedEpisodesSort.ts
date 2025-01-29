import { Pipe, PipeTransform } from '@angular/core';
import { WatchListElement } from '../models/watchList.model';

@Pipe({
  name: 'watchOrder',
  pure: false,
})
export class watchOrderPipe implements PipeTransform {
  transform(
    watchList: WatchListElement[],
    order: 'asc' | 'desc' = 'asc'
  ): WatchListElement[] {
    if (!watchList) return [];

    const sortedList = [...watchList];

    sortedList.sort((a, b) => {
      const sortOrder = order === 'asc' ? 1 : -1;
      return a.watched === b.watched ? 0 : a.watched ? sortOrder : -sortOrder;
    });

    return sortedList;
  }
}
