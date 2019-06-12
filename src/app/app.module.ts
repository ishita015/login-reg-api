import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from './auth/auth-http.interceptor';

import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DataService } from './data.service';
import { AuthService } from './auth/auth.services';

import {
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatDialogModule
 
} from '@angular/material';
import { LoginComponent } from './login/login.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';


import { ListUserComponent } from './user/list-user/list-user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';

import { DialogConfirmationComponent } from './common/dialog-confirmation/dialog-confirmation.component';

@NgModule({
  imports: [
  
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule 
  //  AgmCoreModule.forRoot({
  //     apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
  //   })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    RegistrationFormComponent,
    // AddUserComponent,
    ListUserComponent,
    UpdateUserComponent,
    DialogConfirmationComponent
 ],
 exports: [
  DialogConfirmationComponent,
  ],
  providers: [DataService,AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    }
  ],
  entryComponents: [
    DialogConfirmationComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
