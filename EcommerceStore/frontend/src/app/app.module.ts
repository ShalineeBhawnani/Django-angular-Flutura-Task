import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FeaturedMenuComponent } from './components/featured-menu/featured-menu.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule  } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

@NgModule({
 
  declarations: [
    AppComponent,
    DashboardComponent,
    AboutComponent,
    FeaturedMenuComponent,
    GalleryComponent,
  ],
  imports: 
  [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    SwiperModule,
    NgxDaterangepickerMd,

  ],
  providers: [],
  exports:[
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
