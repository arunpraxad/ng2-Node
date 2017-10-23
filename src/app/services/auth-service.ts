import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { appConfig } from '../../environments/application.config';
import { LocalStorageService } from '../services/localstorage.service';

@Injectable()
export class AuthService {

  private cachedURL:string;
  
  constructor(private router:Router, private localStorageService:LocalStorageService) {}

  isLoggedInUser():boolean {
    return this.localStorageService.getIsLoggedIn() ? true : false;
  }

  public auth(provider:string) : void {
    this.localStorageService.setProvider(provider);
    let isLoggedInUser = this.isLoggedInUser();
    if(provider == "linkedin" && !isLoggedInUser){ 
      window.location.href = 'https://www.linkedin.com/oauth/v2/authorization?client_id='+appConfig.authConfig.linkedin.clientId+'&redirect_uri='+appConfig.authConfig.linkedin.redirectURI+'&response_type=code';
    } else if(provider == "facebook" && !isLoggedInUser){ 
      window.location.href = 'https://www.facebook.com/v2.8/dialog/oauth?client_id='+appConfig.authConfig.facebook.clientId+'&redirect_uri='+appConfig.authConfig.facebook.redirectURI+'&scope=email';
    } else if(provider == "google" && !isLoggedInUser){ 
      window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id='+appConfig.authConfig.google.clientId+'&redirect_uri='+appConfig.authConfig.google.redirectURI+'&scope=email%20profile';
    } else{
      if(!isLoggedInUser) {
        this.router.navigate(['/']);
      }
      this.router.navigate(['/home']);
    }
  }
}
