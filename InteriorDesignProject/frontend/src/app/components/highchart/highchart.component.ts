import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import * as HighCharts from 'highcharts';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-highchart',
  templateUrl: './highchart.component.html',
  styleUrls: ['./highchart.component.css']
})
export class HighchartComponent implements OnInit {

  Chart: any;
  title = 'Dynamic Data';
  updateFlag = false;
  
  constructor (private httpService: HttpClient,
    private userService: UserService,) { }
  chartOptions = {
    responsive: true    
  }
  labels =  ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  chartData = [
    {
      label: '1st label',
      data: [], 
    },
    { 
      label: '2nd label',
      data: []
    }
   ];
  //  dynamic api call

    public options: any = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Age Caluculation Chart'
      },
      xAxis: {
        categories: ['Tom','nick','krish','jack'],
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Age Chart',
          // align: 'high'
        },
      },
      tooltip: {
        formatter : function() {
             return this.y + ' ' +  this.series.tooltipOptions.valueSuffix;
        }
    },
      series: [{
        name : 'age',
        data: [],
        tooltip: {
          valueSuffix: 'year'
      }
      },{
        name : 'weight',
        data: [],
        tooltip: {
          valueSuffix: 'kg'
      }
        
      }
    ]
  }
  
   //  Time Series Chart
  public dataoptions: any = {

    chart: {
      renderTo: 'passenger_container',
      type: 'line'
    },
    title: {
      text: 'Timeseries Data'
    },
    xAxis: {
      categories: []
    },
    
    yAxis: {
      min: 0,
      title: {
        text: 'Yearly Average Value',
      
      },
    },
    tooltip: {
      valueSuffix: 'count'
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true
        }
      }
    },
    series: [{
    
      name : '',
      data: [],
     
    },{
      
      name : '',
      data: [],
    }
  ],
  
}

onOptionsSelected(value:string){

  // this.Chart = new HighCharts.Chart('passenger_container', this.dataoptions);
  // HighCharts.chart('passenger_container', this.dataoptions);
  var chart = HighCharts.chart('passenger_container', this.dataoptions);
  var selVal = value

    if(selVal == "1" || selVal == '')
    {
        this.userService.getPassengerData(selVal).subscribe(

          data => {
            const date = data.date;
            const arrivalsActualCounts = data.arrivalsActualCounts;
            const departuresActualCounts = data.departuresActualCounts;
            this.dataoptions.xAxis.categories = date;

            // console.log(chart.series.length)
            console.log(this.dataoptions.series.length)
            // while(chart.series.length > 0)
            // chart.series[0].remove(true);
            // while(this.dataoptions.series.length > 0)
            //   this.dataoptions.series[0].remove();
            
            // if (this.dataoptions.series.length) {
            //   this.dataoptions.series.splice(0, 1);
            //   // this.dataoptions.series[0].remove();
            // };
        
           
            this.dataoptions.series[0]['name'] = 'ArrivalsActualCounts';
            this.dataoptions.series[0]['data'] = arrivalsActualCounts;
            this.dataoptions.series[1]['name'] = 'DeparturesActualCounts';
            this.dataoptions.series[1]['data'] = departuresActualCounts;

            HighCharts.chart('passenger_container', this.dataoptions);
        
        
          },
          (err: HttpErrorResponse) => {
            console.log (err.message);
          }
        );
        }
        
    else if(selVal == "2")
    {
    
      this.userService.getPassengerData(selVal).subscribe(
        data => {
    
          const arrivalsMinCounts = data.arrivalsMinCounts;
          const departuresMinCounts = data.departuresMinCounts;
        
          this.dataoptions.series[0]['name'] = 'ArrivalsMinCounts';
          this.dataoptions.series[0]['data'] = arrivalsMinCounts;
          this.dataoptions.series[1]['name'] = 'DeparturesMinCounts';
          this.dataoptions.series[1]['data'] = departuresMinCounts;

          HighCharts.chart('passenger_container', this.dataoptions);
      
        },
        (err: HttpErrorResponse) => {
          console.log (err.message);
        }
      );
      
    }
    else
    {
      this.userService.getPassengerData(selVal).subscribe(
        data => {
     
          const arrivalsMaxCounts = data.arrivalsMaxCounts;
          const departuresMaxCounts = data.departuresMaxCounts;
      
          this.dataoptions.series[0]['name'] = 'ArrivalsMaxCounts';
          this.dataoptions.series[0]['data'] = arrivalsMaxCounts;
          this.dataoptions.series[1]['name'] = 'DeparturesMaxCounts';
          this.dataoptions.series[1]['data'] = departuresMaxCounts;
          HighCharts.chart('passenger_container', this.dataoptions);
      
        },
        (err: HttpErrorResponse) => {
          console.log (err.message);
        }
      );
    }  
      HighCharts.chart('passenger_container', this.dataoptions);
};
  ngOnInit(): void {
    this.httpService.get('./assets/birds.json', {responseType: 'json'}).subscribe(
      data => {
          this.chartData = data as any [];
          console.log(this.chartData)
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    );
    this.barChartPopulation();
    this.onSelects();
    this.onOptionsSelected("1");
  }
 
  onChartClick(event) {
    console.log(event);
  }

  barChartPopulation() {
    HighCharts.chart('barChart', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Historic World Population by Region'
      },
      xAxis: {
        categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
      },
      
      yAxis: {
        min: 0,
        title: {
          text: 'Population (millions)',
          align: 'high'
        },
      },
      tooltip: {
        valueSuffix: ' millions'
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      series: [{
        type: undefined,
        name: 'Year 1800',
        data: [107, 31, 635, 203, 2]
      }, {
        type: undefined,
        name: 'Year 1900',
        data: [133, 156, 947, 408, 6]
      }, {
        type: undefined,
        name: 'Year 2000',
        data: [814, 841, 3714, 727, 31]
      }, {
        type: undefined,
        name: 'Year 2016',
        data: [1216, 1001, 4436, 738, 40]
      }]
    });
 
  }

  onSelects(){
    HighCharts.chart('container', this.options);
      this.userService.getData().subscribe(
        data => {
          const age = data.Age;
          const weight = data.weight;
          this.options.series[0]['data'] = age;
          this.options.series[1]['data'] = weight;
          HighCharts.chart('container', this.options);
        },
        (err: HttpErrorResponse) => {
          console.log (err.message);
        }
      );
      }
}