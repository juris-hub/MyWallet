import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CoinsListComponent } from './pages/coins-list/coins-list.component';
import { CoinsTableComponent } from './components/coins-table/coins-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { CoinChartComponent } from './components/coin-chart/coin-chart.component';
import { NgxChartsModule, NumberCardModule } from '@swimlane/ngx-charts';
import { CardModule } from 'primeng/card';
import { AddCoinComponent } from './components/add-coin/add-coin.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { AuthentificationModule } from '../authentification/authentification.module';
import { MenuModule } from 'primeng/menu';
import { SpeedDialModule } from 'primeng/speeddial';
import { EditCoinComponent } from './components/edit-coin/edit-coin.component';
@NgModule({
  declarations: [
    HomeComponent,
    CoinsListComponent,
    CoinsTableComponent,
    PortfolioComponent,
    CoinChartComponent,
    AddCoinComponent,
    EditCoinComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    TableModule,
    ButtonModule,
    DynamicDialogModule,
    NgxChartsModule,
    CardModule,
    NumberCardModule,
    DropdownModule,
    ReactiveFormsModule,
    FormsModule,
    InputNumberModule,
    AuthentificationModule,
    MenuModule,
    SpeedDialModule,
  ],
})
export class HomeModule {}
