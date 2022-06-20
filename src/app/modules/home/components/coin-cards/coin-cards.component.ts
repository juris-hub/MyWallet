import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coin-cards',
  templateUrl: './coin-cards.component.html',
  styleUrls: ['./coin-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoinCardsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
