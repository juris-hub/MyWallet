import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { map, Observable, Subscription, tap } from 'rxjs';
import { CoinService } from 'src/app/services/coin.service';
import { AddCoinComponent } from '../../components/add-coin/add-coin.component';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DialogService],
})
export class PortfolioComponent implements OnInit, OnDestroy {
  data: any;
  private subscription!: Subscription;

  constructor(
    private dynamicDialogService: DialogService,
    private coinService: CoinService
  ) {}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.subscription = this.coinService.coins$
      .pipe(
        map((coins) => {
          return coins.map((coin: any) => {
            return {
              name: coin.name,
              id: coin.id,
            };
          });
        }),
        tap(console.log),
        tap((data) => (this.data = data))
      )
      .subscribe();
  }

  openDialog() {
    const ref = this.dynamicDialogService.open(AddCoinComponent, {
      data: this.data,
      header: 'Add coin',
      width: '70%',
    });
    ref.onClose.subscribe((coin) => {
      // coin. //post request spremanje u bazu
    });
  }
}
