import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { CalibrateComponent } from './calibrate/calibrate.component';

const routes:Routes = [
    { path:'', component:LoginComponent },
    { path:'home', component:HomeComponent },
    { path:'admin', component:HomeComponent },
    { path:'upload', component:ImageUploadComponent },
    { path:'calibrate', component:CalibrateComponent },
    { path:'**', component:LoginComponent }
];

export const AppRoutes = RouterModule.forRoot(routes);