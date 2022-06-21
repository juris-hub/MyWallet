import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  formGroup: FormGroup;

  loading = [false, false];

  constructor(
    private fb: FormBuilder,
    private authentificationService: AuthenticationService
  ) {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  ngOnInit(): void {}

  signUpWithEmail() {
    this.loading[0] = true;
    this.authentificationService
      .SignUp(this.formGroup.value.email, this.formGroup.value.password)
      .then(() => {
        this.loading[0] = false;
      })
      .catch(() => {
        this.loading[0] = false;
      });
  }

  signUpWithGoogle() {
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
