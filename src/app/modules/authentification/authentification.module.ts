import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthentificationRoutingModule } from './authentification-routing.module';
import { AuthentificationComponent } from './authentification.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { PasswordModule } from 'primeng/password';

@NgModule({
  declarations: [
    AuthentificationComponent,
    LoginPageComponent,
    LoginFormComponent,
    RegisterFormComponent,
    RegisterPageComponent,
  ],
  imports: [
    CommonModule,
    CheckboxModule,
    AuthentificationRoutingModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AuthentificationModule {}
