import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Ici, on importe les composants, modules et services que l'on va utiliser dans notre app..
@NgModule({
  // Composants
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    NotFoundComponent, 
  ],
  // Modules
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    HttpClientModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
  ],
  // Services
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule {}
