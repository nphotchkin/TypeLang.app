import { Component, OnDestroy, OnInit } from '@angular/core';
import noUiSlider from "nouislider";


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit  {

  isCollapsed = true;

  constructor() {}

  ngOnInit() {
  }

}
