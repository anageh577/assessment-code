import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'ngx-sub-project',
  templateUrl: './sub-project.component.html',
  styleUrls: ['./sub-project.component.scss'],
})
export class SubProjectComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {

  }
  toggleMenu() {
    document.getElementById('dropdownmenu')?.classList.toggle('show-drop-down');
  }
}
