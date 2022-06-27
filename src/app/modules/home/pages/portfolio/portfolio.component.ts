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
import { EditCoinComponent } from '../../components/edit-coin/edit-coin.component';

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
  userCoinsData: any;
  currentCoinId: any;
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
        command: () => {
          this.editDialog();
        },
      },
      {
        icon: 'pi pi-trash',
        command: () => {
          this.coinService.deleteItem(this.currentWalletId, this.currentCoinId);
        },
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
                            return coin.coinId;
                          });
                          let userCoinsData: any = [];
                          this.data = coins
                            .map((x: any) => {
                              if (userCoinIds.includes(x.id)) {
                                userCoinsData.push(x);
                              }
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
                          this.userCoins = userCoins;
                          this.userCoinsData = userCoinsData;
                          return userCoins;
                        })
                      );
                  })
                )
                .subscribe())
            );
          })
        )
        .subscribe()
    );
  }

  getCoinPriceInUSD(coin: any) {
    let currentCoin = this.userCoinsData.find((x: any) => x.id === coin.coinId);
    return (coin.amount * currentCoin.current_price).toFixed(2);
  }

  getCoinCurrentPrice(coin: any) {
    let currentCoin = this.userCoinsData.find((x: any) => x.id === coin.coinId);
    return currentCoin.current_price.toFixed(6);
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
        return;
      }
    });
  }

  editDialog() {
    const ref = this.dynamicDialogService.open(EditCoinComponent, {
      header: 'Edit coin',
      width: '35%',
    });
    ref.onClose.subscribe((coinAmount) => {
      if (coinAmount) {
        this.coinService.updateItem(this.currentWalletId, this.currentCoinId, {
          amount: coinAmount,
        });
      } else {
        return;
      }
    });
  }

  setCurrentId(id: any) {
    this.currentCoinId = id;
  }
}
