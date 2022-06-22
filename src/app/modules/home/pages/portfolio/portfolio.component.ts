import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { image } from 'd3';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import {
  combineLatest,
  EMPTY,
  map,
  Observable,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { CoinService } from 'src/app/services/coin.service';
import { AddCoinComponent } from '../../components/add-coin/add-coin.component';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  providers: [DialogService],
})
export class PortfolioComponent implements OnInit, OnDestroy {
  data: any;
  wallet: any;
  items!: MenuItem[];
  currentWalletId: any;
  userCoins: any;
  private subscriptions: Subscription[] = [];

  constructor(
    private dynamicDialogService: DialogService,
    private coinService: CoinService
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }

  ngOnInit(): void {
    this.items = [
      {
        icon: 'pi pi-pencil',
        command: () => {},
      },
      {
        icon: 'pi pi-trash',
        command: () => {},
      },
    ];

    this.subscriptions.push(
      combineLatest([this.coinService.coins$, this.coinService.currentUserId$])
        .pipe(
          tap(([coins, id]) => {
            this.subscriptions.push(
              (this.wallet = this.coinService
                .getUserWallet(id)
                .pipe(
                  switchMap((wallet) => {
                    this.currentWalletId = wallet[0].id;
                    return this.coinService
                      .getUserCoins(this.currentWalletId)
                      .pipe(
                        switchMap((userCoins) => {
                          let userCoinIds = userCoins.map((coin: any) => {
                            console.log(coin);
                            return coin.coinId;
                          });
                          this.data = coins
                            .map((x: any) => {
                              if (!userCoinIds.includes(x.id)) {
                                return {
                                  image: x.image,
                                  name: x.name,
                                  id: x.id,
                                };
                              }
                              return;
                            })
                            .filter((y: any) => y !== undefined);
                          console.log(userCoinIds);
                          console.log(this.data);
                          console.log(userCoins);
                          this.userCoins = userCoins;
                          return this.userCoins;
                        })
                      );
                  })
                )
                .subscribe())
            );
          }),
          tap(console.log)
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
        this.coinService.addItem(this.currentWalletId, coin);
      } else {
        return console.log('blabla');
      }
    });
  }
}
