import { Component, OnInit,ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
// require('highcharts/themes/dark-blue')(Highcharts);
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-high-chart-example',
  templateUrl: './high-chart-example.component.html',
  styleUrls: ['./high-chart-example.component.css']
})
export class HighChartExampleComponent implements OnInit 
{
  constructor (private httpService: HttpClient,
    private userService: UserService,) { }
  chart: any;
  timeSeriesData:[];
  headers:[];
  timeSeriesDatas: any;
  arrivalArray = [];
  departureArray = [];
  ngOnInit(): void
  {
    this.onOptionsSelected("mean");
    this.chart = Highcharts.chart('container', 
    {
      chart: 
      {
        zoomType: 'x',
        backgroundColor: 
        {
          linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
          stops: 
          [
            [0, '#2a2a2b'],
            [1, '#3e3e40']
          ]
        },
        style: 
        {
          font: 'Roboto,sans-serif'
        }
        // styledMode:true,
      },
      credits: 
      {
        enabled: false
      },
      title: 
      {
        text: 'Time Series Data',
        style: 
        {
          color: '#FFF',
          textTransform: 'uppercase',
        }
      },
      subtitle: 
      {
        text: 'Timeseries ArrivalsCounts & DeparturesCounts',
        style: 
        {
          color: '#DDD',
        }
      },
      // time: 
      // {
      //   useUTC: false
      // },
      xAxis: 
      { 
        categories: [],
        type: 'datetime',
        tickInterval: 1,
        labels: 
        {
          enabled: true,
          // formatter: function()
          // { 
          //   return this.arrivalArray[this.value][0];
          // },
          // format: '{value:%Y}',
          // rotation: 45,
          // align: 'left',
          style: 
          {
            color: '#E0E0E3',
            fontWeight: 'bold',
          } 
        },
        // dateTimeLabelFormats: 
        // {
        //   year: '%Y'
        // },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
      },
      yAxis: 
      {
        gridLineColor: '#707073',
        labels: 
        {
          style: 
          {
            color: '#E0E0E3',
            fontWeight: 'bold'
          }
        },
        min: 0,
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        tickWidth: 1,
        title: 
        {
          text: 'Yearly Average Value',
          style: 
          {
            color: '#E0E0E3',
            font: 'Roboto,sans-serif'
          }
        },
      },
      tooltip: 
      {
        // shared: true,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        borderColor:'red',
        borderRadius:20,
        valueSuffix: 'count',
        style: 
        {
          color: '#F0F0F0'
        }
      },
      
      plotOptions: 
      {
        series: 
        {
          cursor: 'pointer',
          point: 
          {
            events: 
            {
              click: (function(e)
              {
                var popup = document.getElementById("popup");
                popup.classList.toggle("show");
                
                this.userService.getYearValue(e.point.category).subscribe(
                data => 
                {
                  this.headers = ["Date", "Arrivals Counts", "Departure Counts"];
                  this.timeSeriesData = data;
                },
                (err: HttpErrorResponse) => 
                {
                  console.log (err.message);
                }
                )
              }).bind(this)
            }
          }
        },
      },
      colors: ['#ED561B', '#50B432'],
      series: 
      [
        {
          type: 'line',
          gapSize: 1,
          name : '',
          data:[],
          // data: this.arrivalArray,
          color:'#ED561B'
        },
        {
          type: 'line',
          gapSize: 1,
          name : '',
          data:[],
          // data: this.departureArray,
          color:'',
        }
      ],
      legend: 
      {
        itemStyle: 
        {
          color: 'white'
        }  
      }
    });
  }
closePopup()
{
  var popup = document.getElementById("popup");
  popup.classList.toggle("show");
}
removeSeries()
{
  while(this.chart.series.length > 0)
  {
    this.chart.series[0].remove(true);
  }
}
removePlotBand()
{
  this.chart.xAxis[0].removePlotBand('band');
  this.chart.yAxis[0].removePlotLine('line');
}
onOptionsSelected(value:string)
{
  var option = value
  var year: any[] = [];
  var arrival: any[] = [];
  var departure: any[] = [];

  this.userService.getPassengerData(option).subscribe(
    data => 
    {
      for (let key in data) 
      {
        let value = data[key];
        let date = value.year
        year.push(date);
        // var date = new Date(year,0, 1,).getTime() // 1 Jan year, 00:00:00  (year,0, 1,0, 0, 0, 0)
    
        let arrivalValue = value.arrival
        arrival.push(arrivalValue);
        // arrival.push([arrivalValue]);
        
        let departureValue = value.departure
        departure.push(departureValue); 
        // departure.push([departureValue]);
      }

      // var array1 = [arrival]
      // var array2 = [departure]

      // this.arrivalArray.push(array1);
      // this.departureArray.push(array2);  

      // console.log("arrivalArray",this.arrivalArray);  
      // console.log("departureArray",this.departureArray); 

      this.removeSeries()
      this.removePlotBand()
      this.chart.xAxis[0].setCategories(year,true),
      this.chart.xAxis[0].addPlotBand(
      {
        id:'band',
        color:'rgba(68,170,213,.2)',
        from: 6,
        to: 12,
        opacity: 0.8,
        label: 
        {
          text: 'Mid Data',
          font: '18px sans-serif',
          color: '#DDD',
          margin: 5,
        }
      });
      this.chart.yAxis[0].addPlotLine(
      {
        id:'line',
        color: 'red',
        width: 2,
        value: 130000,
      });
      this.chart.addSeries(
      {
        name: 'ArrivalsCounts',
        data: arrival
        // data: [
        //   this.arrivalArray
        // ],
    
       
      });
      this.chart.addSeries(
      {
        name: 'DeparturesCounts',
        data: departure
        // data: [
        //   departureArray
        // ],
        
      });
    },
    (err: HttpErrorResponse) => 
    {
      console.log (err.message);
    }
    );
  }
}

