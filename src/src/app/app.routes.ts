import { Routes } from '@angular/router';
import { TablesComponent } from './tables/tables.component';
import { HomeComponent } from './home/home.component';
import { SessionComponent } from './session/session.component';

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
  {
    path: 'session',
    title: 'Smart Menu',
    component: SessionComponent,
  },
];
