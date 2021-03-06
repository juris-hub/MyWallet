import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedInGuard as AuthGuard } from 'src/app/services/is-logged-in.guard';

const routes: Routes = [
  {
    path: 'authentification',
    loadChildren: () =>
      import('./modules/authentification/authentification.module').then(
        (m) => m.AuthentificationModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
