import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-edit-coin',
  templateUrl: './edit-coin.component.html',
  styleUrls: ['./edit-coin.component.scss'],
})
export class EditCoinComponent implements OnInit {
  coinAmount: FormControl;

  constructor(
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ) {
    this.coinAmount = new FormControl(null, Validators.required);
  }
  ngOnInit(): void {}

  onSubmit() {
    if (!this.coinAmount.valid) {
      return;
    }
    this.ref.close(this.coinAmount.value);
  }
}
