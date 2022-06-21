import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { map, Observable, Subscription, tap } from 'rxjs';
import { AddCoinService } from 'src/app/services/add-coin.service';
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
  wallet: any;
  private subscriptions: Subscription[] = [];
  private currentUserId: any;

  constructor(
    private dynamicDialogService: DialogService,
    private coinService: CoinService,
    private addCoinService: AddCoinService
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.coinService.coins$
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
        .subscribe()
    );
    this.subscriptions.push(
      this.addCoinService.currentUserId$
        .pipe(
          tap((id) => {
            this.currentUserId = id;
            this.wallet = this.addCoinService.getUserWallet(id);
          })
        )
        .subscribe()
    );
  }

  openDialog() {
    const ref = this.dynamicDialogService.open(AddCoinComponent, {
      data: this.data,
      header: 'Add coin',
      width: '70%',
    });
    ref.onClose.subscribe((coin) => {
      if (coin) {
        this.addCoinService.addItem(this.currentUserId, coin);
      } else {
        return console.log('blabla');
      }
    });
  }
}
