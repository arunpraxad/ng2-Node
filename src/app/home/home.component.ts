import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { InterceptorService } from 'ng2-interceptors';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import {  Router, Route } from '@angular/router';
import { LocalStorageService } from '../services/localstorage.service';
import { appConfig } from '../../environments/application.config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  imgObject = {};
  imgArr = [];
  selectedImages = [];
  private code:string;

  constructor(private _http: InterceptorService,private router:Router, private location: Location, private localStorageService:LocalStorageService) {
    let provider = localStorage.getItem("provider");
    let params = new URLSearchParams(this.location.path(false).split('?')[1]);
    this.code = params.get('code');  

    if(this.code){
      this.login(this.code, appConfig["authConfig"][provider].clientId, appConfig["authConfig"][provider].redirectURI, appConfig["authConfig"][provider].endpoint)
      .then((data:any) => {
          this.router.navigate(['/home']);
          return true;
      });
    }
    
    this.imgObject = {
      'img 1':'assets/Apple_Back.png',
      'img 2':'assets/Apple_Front.png',
      'img 3':'assets/samsung_Back.png',
      'img 4':'assets/Samsung_Front.png'
    }
    for(let key in this.imgObject) {
      var obj = this.imgObject;
      this.imgArr.push({'index':key, 'path':obj[key]});
    }
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }

  selectedImage(selectedObj) {
    this.selectedImages.push(selectedObj);
  }

  login(code:any, clientId:any, redirectURI:any, authEndpoint:any): Promise<any> {
    var body = {"code" : code,"clientId" : clientId,"redirectUri":redirectURI}
    return this._http.post(authEndpoint,body,{})
              .toPromise()
              .then((r: Response) => { 
                        this.localStorageService.setIsLoggedIn("true");
                        this.localStorageService.setToken(r.json().token);
                        return r.json()
                })
                .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

  logout(): void {
    this.localStorageService.setIsLoggedIn("fasle");
    this.localStorageService.clearToken();
    this.localStorageService.clearProvider();
    this.router.navigate(['/']);
  }
}