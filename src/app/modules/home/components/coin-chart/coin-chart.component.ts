import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { CoinService } from 'src/app/services/coin.service';

@Component({
  selector: 'app-coin-chart',
  templateUrl: './coin-chart.component.html',
  styleUrls: ['./coin-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoinChartComponent implements OnInit {
  coinIdSubject = new BehaviorSubject(7);
  coinId$ = this.coinIdSubject.asObservable();
  coin$!: Observable<any>;
  date = new Date();
  legendTitle!: string;
  coinPrice!: string;
  dateTime!: string;

  constructor(
    private config: DynamicDialogConfig,
    private coinService: CoinService
  ) {}

  ngOnInit(): void {
    this.legendTitle = `${
      this.config.header
    } price chart ${this.config.data.symbol.toUpperCase()}/USD`;

    this.coin$ = this.coinId$.pipe(
      switchMap((id) => {
        return this.coinService.getHistoricalData(id, this.config.data.id).pipe(
          map((data: any) => {
            let series: any = [];
            data?.prices.map((x: any) => {
              series.push({
                name: 'Date: ' + new Date(x[0]).toLocaleString(),
                value: x[1].toFixed(2),
              });
            });
            return [{ name: this.config.header, series: series }];
          })
        );
      })
    );
  }

  getCoinPrice(daysAgo: number) {
    this.coinIdSubject.next(daysAgo);
  }
}
