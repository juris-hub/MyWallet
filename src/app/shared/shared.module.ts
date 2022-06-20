import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarModule } from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import {MenuModule} from 'primeng/menu';




@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    MenuModule,
  ],
  exports: [HeaderComponent, FooterComponent]
})
export class SharedModule { }
