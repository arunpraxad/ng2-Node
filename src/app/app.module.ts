import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutes } from './app.routes';
import { LoginComponent } from './login/login.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { CalibrateComponent } from './calibrate/calibrate.component';
import { LifeSizeIndexCalcService } from './services/life-size-index-calc.service';
import { AuthService } from './services/auth-service';
import { InterceptorModule } from '../Interceptor/interceptor.module';
import { LocalStorageService } from '../app/services/localstorage.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ImageUploadComponent,
    CalibrateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutes,
    HttpModule,
    InterceptorModule
  ],
  providers: [
    LifeSizeIndexCalcService,
    AuthService,
    LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
