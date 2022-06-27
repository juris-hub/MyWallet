import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  display!: boolean;

  constructor() {}

  ngOnInit(): void {}

  onHeaderClick($event: any) {
    this.display = $event;
  }
}
