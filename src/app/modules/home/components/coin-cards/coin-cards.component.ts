import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AddCoinService } from 'src/app/services/add-coin.service';

@Component({
  selector: 'app-coin-cards',
  templateUrl: './coin-cards.component.html',
  styleUrls: ['./coin-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoinCardsComponent implements OnInit {
  items!: MenuItem[];

  constructor(private addCoinService: AddCoinService) {}

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
  }
}
