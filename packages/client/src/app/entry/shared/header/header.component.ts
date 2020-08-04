import { Component, Input, OnInit } from '@angular/core';
import { Summary } from 'src/app/core/api/api.types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() entry: Summary;
  constructor() {}

  ngOnInit(): void {}
}
