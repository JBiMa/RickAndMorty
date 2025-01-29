import { Component, OnInit } from '@angular/core';
import { LocationRM } from '../../shared/models/location.model';
import { LocationService } from '../../core/servers/locations.service';
import { getValidFilters, itemsPerPage } from '../../shared/core/constants';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationFilters } from '../../shared/models/filters.model';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: [
    './locations.component.scss',
    '../../../styles/components/paginator.scss',
  ],
})
export class LocationsComponent implements OnInit {
  isLoading: boolean;
  locations$: Observable<LocationRM[]>;
  itemsPerPageValue = itemsPerPage;
  totalLocations = 0;
  actualPage = 1;
  filters: LocationFilters = {
    name: '',
    type: '',
    dimension: '',
  };

  constructor(
    private locationService: LocationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      const validFilters = getValidFilters<LocationFilters>(
        params,
        this.filters
      );
      this.filters = { ...this.filters, ...validFilters };
      this.loadLocations();
    });
  }

  loadLocations(): void {
    this.isLoading = true;
    this.locations$ = this.locationService
      .getLocations(this.actualPage, this.filters)
      .pipe(
        tap((data) => {
          this.totalLocations = data.info.count;
          this.isLoading = false;
        }),
        map((data) => data.results),
        catchError((error) => {
          this.isLoading = false;
          return throwError(() => error);
        })
      );
  }

  updateUrl(): void {
    const queryParams = { ...this.filters, page: this.actualPage };
    this.router.navigate([], { queryParams });
  }

  onPageChange(event: any): void {
    this.actualPage = event.pageIndex + 1;
    this.updateUrl();
  }
}
