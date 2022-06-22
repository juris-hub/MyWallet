import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { map } from 'rxjs';

@Component({
  selector: 'app-add-coin',
  templateUrl: './add-coin.component.html',
  styleUrls: ['./add-coin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCoinComponent implements OnInit {
  coins: any = [];
  formGroup: FormGroup;
  coinImage: any;

  constructor(
    private config: DynamicDialogConfig,
    private fb: FormBuilder,
    private ref: DynamicDialogRef
  ) {
    this.formGroup = this.fb.group({
      coinId: ['', Validators.required],
      amount: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.formGroup.valueChanges.subscribe(console.log);
    this.coins = this.config.data;
  }

  onSubmit() {
    if (!this.formGroup.valid) {
      return;
    }
    this.ref.close({ ...this.formGroup.value, image: this.coinImage });
  }
  onSelect() {
    this.coinImage = this.coins.find(
      (x: any) => x.id == this.formGroup.value.coinId
    ).image;
    console.log(this.coinImage);
  }
}
