import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  items!: MenuItem[];

  @Output() sidebarStatus = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {label: 'Log out', command: () => this.onSignOut()},
  ];
  }



  onSignOut(){

  }


}
