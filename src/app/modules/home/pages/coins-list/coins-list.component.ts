import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CoinService } from 'src/app/services/coin.service';

@Component({
  templateUrl: './coins-list.component.html',
  styleUrls: ['./coins-list.component.scss'],
})
export class CoinsListComponent implements OnInit {
  data$!: Observable<any>;
  constructor(private coinsService: CoinService) {}

  ngOnInit(): void {
    this.data$ = this.coinsService.coins$;
  }
}
