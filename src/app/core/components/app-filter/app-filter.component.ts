import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Filters } from '../../../shared/models/filters.model';
import { itemsPerPage } from '../../../shared/core/constants';

@Component({
  selector: 'app-filter',
  templateUrl: './app-filter.component.html',
  styleUrls: ['./app-filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input() filters: Filters = {};
  @Input() suggestionObj: { [key: string]: string } = {};
  @Output() applyFiltersEvent = new EventEmitter<Filters>();

  filtersToDisplay: string[] = [];

  ngOnInit(): void {
    this.updateFilterKeys();
  }

  applyFilters(): void {
    this.applyFiltersEvent.emit(this.filters);
  }

  updateFilterKeys(): void {
    this.filtersToDisplay = Object.keys(this.filters);
  }
}
