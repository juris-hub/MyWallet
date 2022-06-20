import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinCardsComponent } from './coin-cards.component';

describe('CoinCardsComponent', () => {
  let component: CoinCardsComponent;
  let fixture: ComponentFixture<CoinCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoinCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoinCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
