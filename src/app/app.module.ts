import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// tslint:disable-next-line:max-line-length
import { NbThemeModule, NbLayoutModule, NbCardModule, NbStepperModule, NbInputModule, NbDatepickerModule, NbContextMenuModule, NbMenuModule } from '@nebular/theme';
import { NbButtonModule, NbSelectModule, NbAccordionModule } from '@nebular/theme';
import {MapModule, MapAPILoader, MarkerTypeId, IMapOptions, IBox, IMarkerIconInfo, WindowRef, DocumentRef, MapServiceFactory,
  BingMapAPILoaderConfig, BingMapAPILoader,
  GoogleMapAPILoader,  GoogleMapAPILoaderConfig
} from 'angular-maps';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { SignupComponent } from './home/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HistoryComponent } from './dashboard/history/history.component';
import { SelectComponent } from './dashboard/select/select.component';

export function MapServiceProviderFactory() {
  const bc: BingMapAPILoaderConfig = new BingMapAPILoaderConfig();
  bc.apiKey = 'AkXQwHaeRR9GH41wKbY6kSb7C1cwspYU6Z4QiqycnxajgmRyaTdcBfUbjBROgqEG '; // your bing map key
  bc.branch = 'experimental';
      // to use the experimental bing brach. There are some bug fixes for
      // clustering in that branch you will need if you want to use
      // clustering.
  return new BingMapAPILoader(bc, new WindowRef(), new DocumentRef());
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    HistoryComponent,
    SelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbLayoutModule,
    NbCardModule,
    NbButtonModule,
    NbStepperModule,
    NbSelectModule,
    NbAccordionModule,
    NbDatepickerModule.forRoot(),
    NbMenuModule.forRoot(),
    NbInputModule,
    NbContextMenuModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    ChartsModule,
    ReactiveFormsModule,
    MapModule.forRoot()
  ],
  providers: [
    {
      provide: MapAPILoader, deps: [], useFactory: MapServiceProviderFactory
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
