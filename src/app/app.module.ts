import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { SpeedInsights } from "@vercel/speed-insights/next"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MyprojectsComponent } from './myprojects/myprojects.component';
import { ServicesComponent } from './services/services.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MyprojectsComponent,
    ServicesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
