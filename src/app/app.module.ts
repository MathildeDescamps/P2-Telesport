import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { OlympicsComponent } from './olympics/olympics.component';
import { OlympicComponent } from './olympic/olympic.component';

// We import here every components, modules, and services that we want to use in our app
@NgModule({
  // Components
  declarations: [
    AppComponent,
    NotFoundComponent, 
    OlympicsComponent, 
    OlympicComponent
  ],
  // Modules
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    HttpClientModule
  ],
  // Services
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
