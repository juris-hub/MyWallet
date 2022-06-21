import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  items!: MenuItem[];

  constructor(private authentificationService: AuthenticationService) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Log out',
        command: () => this.authentificationService.SignOut(),
      },
    ];
  }

  onSignOut() {}
}
