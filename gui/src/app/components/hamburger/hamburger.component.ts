import { Component, OnInit } from '@angular/core';

interface Entry {
  label: string;
  icon: string;
  event: () => void;
}

@Component({
  selector: 'hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.scss']
})
export class HamburgerComponent implements OnInit {

  constructor() { }

  public entries: Entry[] = [
    {
      label: 'Home',
      icon: 'home',
      event: () => {
        console.log('Home');
      }
    },
    {
      label: 'Layers',
      icon: 'dashboard',
      event: () => {
        console.log('Home');
      }
    },
    {
      label: 'About',
      icon: 'info',
      event: () => {
        console.log('Home');
      }
    }
  ];

  ngOnInit(): void {
  }

}
