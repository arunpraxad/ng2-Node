import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() { }

  //Token
  setToken(appToken) {
    localStorage.setItem('AppToken', appToken);
  }
  getToken() {
    return localStorage.getItem('AppToken');
  }
  clearToken() {
    localStorage.removeItem('AppToken');
  }

  //Logged In
  setIsLoggedIn(isLoggedIn) {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }
  getIsLoggedIn() {
    return localStorage.getItem('isLoggedIn') && localStorage.getItem('isLoggedIn') == "true";
  }

  //provider
  setProvider(provider) {
    localStorage.setItem('provider', provider);
  }
  getProvider() {
    return localStorage.getItem('provider');
  }
  clearProvider() {
    localStorage.removeItem('provider');
  }
}
