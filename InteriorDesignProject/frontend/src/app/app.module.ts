import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavComponent } from './components/nav/nav.component';
import { FormComponent } from './components/form/form.component';
import { AboutComponent } from './components/about/about.component';
import { ServiceComponent } from './components/service/service.component';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PropertiesComponent } from './components/properties/properties.component';
import { ChartModule } from 'angular-highcharts';
import { HighchartComponent } from './components/highchart/highchart.component';
import { ChartsModule } from 'ng2-charts';
import { FileuploadComponent } from './components/fileupload/fileupload.component';
import { HighChartExampleComponent } from './components/high-chart-example/high-chart-example.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavComponent,
    FormComponent,
    AboutComponent,
    ServiceComponent,
    PropertiesComponent,
    HighchartComponent,
    FileuploadComponent,
    HighChartExampleComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    ChartModule,

  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
