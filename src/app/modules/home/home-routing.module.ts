import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedInGuard } from 'src/app/services/is-logged-in.guard';
import { HomeComponent } from './home.component';
import { CoinsListComponent } from './pages/coins-list/coins-list.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'coins-list',
        component: CoinsListComponent,
      },
      {
        path: 'portfolio',
        component: PortfolioComponent,
        canActivate: [IsLoggedInGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
