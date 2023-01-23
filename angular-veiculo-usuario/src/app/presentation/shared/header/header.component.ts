import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from 'src/app/domain/services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  nomeCurrentUser: string

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.nomeCurrentUser = this.accountService.nomeCurrentUser();
  }

  isMenuCollapsed = true;
  
  public logoff() {

    this.accountService.logoff();
  }

}
