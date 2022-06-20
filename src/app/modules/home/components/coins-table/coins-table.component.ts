import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { Coin } from 'src/app/Coin';
import { CoinService } from 'src/app/services/coin.service';
import { CoinChartComponent } from '../coin-chart/coin-chart.component';

@Component({
  selector: 'app-coins-table',
  templateUrl: './coins-table.component.html',
  styleUrls: ['./coins-table.component.scss'],
  providers: [DialogService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoinsTableComponent implements OnInit {
  data$!: Observable<Coin[]>;

  constructor(
    private coinsService: CoinService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.data$ = this.coinsService.coins$;
  }

  onOpenDialog(coin: any) {
    const ref = this.dialogService.open(CoinChartComponent, {
      data: { id: coin.id, symbol: coin.symbol },
      header: coin.name,
      width: '70%',
    });
  }
}
