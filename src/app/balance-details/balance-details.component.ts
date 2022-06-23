import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AccountBalance } from '../AccountBalance';
import { AccountbalanceService } from '../accountbalance.service';
import { MatTableDataSource } from '@angular/material/table';
import { Constants } from '../Constants';

@Component({
  selector: 'app-balance-details',
  templateUrl: './balance-details.component.html',
  styleUrls: ['./balance-details.component.css']
})
export class BalanceDetailsComponent implements OnInit {
  dataSource!: MatTableDataSource<AccountBalance>;
  currentAccountBalance : AccountBalance[] = [];
  year? : string;
  month? : string;


  displayedColumns: string[] = ['rdBalance', 'canteenBalance', 'carBalance', 'marketingBalance', 'parkingFinesBalance'];


  // constructor( private http: HttpClient, private accountBalanceService : AccountbalanceService) { }

constructor(private http: HttpClient, private accountBalanceService : AccountbalanceService){};

  ngOnInit(): void {
    this.getCurrentAccountBalance();
  }



  getCurrentAccountBalance(): void{
    this.accountBalanceService.getCurrentBalance().
    subscribe(accountBalance=>{
      console.log('accountBalance', accountBalance);
      this.year = accountBalance?.id.substring(0,4);
      this.month = Constants.MONTHS.find(x=> x.Value ===  accountBalance.id.substring(4,6))?.Text;
      this.currentAccountBalance.push(accountBalance);
      this.dataSource = new MatTableDataSource<AccountBalance>(this.currentAccountBalance);


    });
    
  }
  

}