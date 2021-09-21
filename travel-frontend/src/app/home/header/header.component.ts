import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from "../../_services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  scrollPosition: number = 0;
  windowWidth: number = 0;
  scrollDown: boolean = false;

  @HostListener('window:resize', ['$event'])
  @HostListener('window:scroll', ['$event'])
  doSomething() {
    this.windowWidth = window.outerWidth;
    this.scrollDown = window.pageYOffset > this.scrollPosition;
    this.scrollPosition = window.pageYOffset;
  }

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  isLoggedIn() {
    return !!this.auth.token;
  }

}
