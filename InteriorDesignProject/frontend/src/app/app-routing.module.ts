import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FileuploadComponent } from './components/fileupload/fileupload.component';
import { HighChartExampleComponent } from './components/high-chart-example/high-chart-example.component';
import { HighchartComponent } from './components/highchart/highchart.component';

const routes: Routes = [

  {
    path:'',
    component: DashboardComponent,
  },
  {
    path:'fileupload',
    component: FileuploadComponent,
  },
  {
    path:'highcharts',
    component: HighchartComponent,
  },
  {
    path:'highchart',
    component: HighChartExampleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
