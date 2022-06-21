import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit {
  formGroup: FormGroup;
  loading = [false, false];

  constructor(
    private fb: FormBuilder,
    private authentificationService: AuthenticationService
  ) {
    this.formGroup = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      rememberUser: [false],
    });
  }

  ngOnInit(): void {}

  signInWithEmail() {
    this.loading[0] = true;
    this.authentificationService
      .SignIn(this.formGroup.value.email, this.formGroup.value.password)
      .then(() => {
        this.loading[0] = false;
      })
      .catch(() => {
        this.loading[0] = false;
      });
  }

  signInWithGoogle() {
    this.loading[1] = true;
    this.authentificationService
      .GoogleAuth()
      .then(() => {
        this.loading[1] = false;
      })
      .catch(() => {
        this.loading[1] = false;
      });
  }
}
