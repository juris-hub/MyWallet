import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-add-coin',
  templateUrl: './add-coin.component.html',
  styleUrls: ['./add-coin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCoinComponent implements OnInit {
  coins: any = [];
  formGroup: FormGroup;

  constructor(
    private config: DynamicDialogConfig,
    private fb: FormBuilder,
    private ref: DynamicDialogRef
  ) {
    this.formGroup = this.fb.group({
      selectedItem: ['', Validators.required],
      coinInput: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.formGroup.valueChanges.subscribe(console.log);
    this.coins = this.config.data;
    console.log(this.coins);
    console.log(this.formGroup.controls);
  }

  onSubmit() {
    if (!this.formGroup.valid) {
      return;
    }
    this.ref.close(this.formGroup.value);
  }
}
