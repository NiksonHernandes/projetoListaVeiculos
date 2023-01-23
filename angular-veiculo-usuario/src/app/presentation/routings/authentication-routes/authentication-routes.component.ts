import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authentication-routes',
  templateUrl: './authentication-routes.component.html',
  styleUrls: ['./authentication-routes.component.scss']
})
export class AuthenticationRoutesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public isCollapsed = true;
}
