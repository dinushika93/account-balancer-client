import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { AccountbalanceService } from '../accountbalance.service';
import { Constants } from '../Constants';




@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  fromYear: string = '';
  fromMonth : string = '';
  toYear: string = '';
  toMonth: string = '';
  monthList = Constants.MONTHS;
  data : any;
  reports_form : FormGroup;
  lineChartData? : ChartConfiguration<'line'>['data'];


  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;
  public lineChartPlugins = [];

  constructor(private http: HttpClient, private accountBalanceService : AccountbalanceService, private formBuilder: FormBuilder){
    this.reports_form = formBuilder.group({
      'fromYear': [null, Validators.required],
      'fromMonth': [ undefined , Validators.required],
      'toYear': [ undefined , Validators.required],
      'toMonth': [ undefined , Validators.required],
    });
  };

  ngOnInit(): void {
  }

  showSummary(): void {
    this.getPeriodicAccountBalance();
  }

  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this.formBuilder.group({
    floatLabel: this.floatLabelControl,
  })

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  getPeriodicAccountBalance(): void{
    this.accountBalanceService.getPeriodicalBalance(this.fromMonth, this.fromYear, this.toMonth, this.toYear)
    .subscribe(response  => {
      this.data = response;
      console.log(response);
      this.lineChartData = {
        labels: this.data["id"],
        datasets: [
          {
            data: this.data.accountSummaries.filter((obj : any)=> {
              return obj.account === 'R&D';
            })[0].balanceArray,
            label: 'R&D',
            borderColor: 'black',
            backgroundColor: 'rgba(255,0,0,0.3)'
          },
          {
            data: this.data.accountSummaries.filter((obj : any)=> {
              return obj.account === 'Canteen';
            })[0].balanceArray,
            label: 'Canteen',
            tension: 0.5,
            borderColor: 'green',
            backgroundColor: 'rgba(255,0,0,0.3)'
          },
          {
            data: this.data.accountSummaries.filter((obj : any)=> {
              return obj.account === 'Car';
            })[0].balanceArray,
            label: 'Car',
            tension: 0.5,
            borderColor: 'pink',
            backgroundColor: 'rgba(255,0,0,0.3)'
          },
          {
            data: this.data.accountSummaries.filter((obj : any)=> {
              return obj.account === 'Marketing';
            })[0].balanceArray,
            label: 'Marketing',
            tension: 0.5,
            borderColor: 'purple',
            backgroundColor: 'rgba(255,0,0,0.3)'
          },
          {
            data: this.data.accountSummaries.filter((obj : any)=> {
              return obj.account === 'ParkingFines';
            })[0].balanceArray,
            label: 'ParkingFines',
            tension: 0.5,
            borderColor: 'grey',
            backgroundColor: 'rgba(255,0,0,0.3)'
          }
        ]
      };
    });

  }

}
