import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinCardEmptyComponent } from './coin-card-empty.component';

describe('CoinCardEmptyComponent', () => {
  let component: CoinCardEmptyComponent;
  let fixture: ComponentFixture<CoinCardEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoinCardEmptyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoinCardEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
