import { Component, OnInit } from '@angular/core';
import { initFavCharacterList } from './core/store/favorite.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'rick-and-morty-app';
  ngOnInit(): void {
    this.store.dispatch(initFavCharacterList());
  }

  constructor(private store: Store) {}
}
