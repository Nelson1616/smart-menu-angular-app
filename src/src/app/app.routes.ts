import { Routes } from '@angular/router';
import { TablesComponent } from './tables/tables.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Smart Menu',
    component: HomeComponent,
  },
  {
    path: 'tables/:code',
    title: 'Enter Table',
    component: TablesComponent,
  },
];
