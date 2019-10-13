import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public showMenu = false;

  constructor() { }

  ngOnInit() {
  }

  onMenuIconClick():void{
    this.showMenu = !this.showMenu;
  }

}
