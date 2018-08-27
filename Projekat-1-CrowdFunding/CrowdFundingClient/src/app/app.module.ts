import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MainComponent } from './page/main/main.component';

import { AuthenticationService } from './security/authentication-service.service';
import { JwtUtilsService } from './security/jwt-utils.service';
import { TokenInterceptorService } from './security/token-interceptor.service';
import { CanActivateAuthGuard } from './security/can-activate-auth.guard.service';
import { DonationService } from './service/donation.service';
import { ProjectService } from './service/project.service';
import { DetailsComponent } from './page/details/details.component';
import { AddProjectComponent } from './page/add-project/add-project.component';
import { CategoryService } from './service/category.service';
import { ContactComponent } from './page/contact/contact.component';
import { AboutComponent } from './page/about/about.component';
import { LoginComponent } from './login/login/login.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'main', component: MainComponent},
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'projects/:id', component: DetailsComponent},
  { path: 'add-project', component: AddProjectComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'about', component: AboutComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DetailsComponent,
    AddProjectComponent,
    ContactComponent,
    AboutComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
     HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: false
      }
    )
  ],
  providers: [
     {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    AuthenticationService,
    CanActivateAuthGuard,
    JwtUtilsService,
    ProjectService,
    DonationService,
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
