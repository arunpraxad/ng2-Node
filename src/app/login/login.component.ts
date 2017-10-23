import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/localstorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _authService:AuthService, private router:Router, private localStorageService:LocalStorageService) { }

  ngOnInit() {
    if(this.localStorageService.getToken()) {
      this.router.navigate(["/home"]);
    } else {
      this.localStorageService.setIsLoggedIn("false");
      this.router.navigate(["/"]);
    }
  }

  authProcess(provider:string) {
    this._authService.auth(provider.toLowerCase());
  }
}