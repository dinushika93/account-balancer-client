import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { AccountBalance } from './AccountBalance';

@Injectable({
  providedIn: 'root'
})
export class AccountbalanceService {


  constructor(private http: HttpClient) { }
 
  baseURL = "http://localhost:5053/api/AccountBalances";

  getCurrentBalance(): Observable<AccountBalance> {
    const url = `${this.baseURL + "/CurrentBalance"}`;
    return this.http.get<AccountBalance>(url)
      .pipe(
        catchError(this.handleError<AccountBalance>('getCurrentBalance'))
      );
  }

    getPeriodicalBalance(fromMonth:string, fromYear:string, toMonth:string, toYear:string): Observable<JSON> {
    const url = `${this.baseURL + "/PeriodicalAccountBalance"}/${fromMonth}/${fromYear}/${toMonth}/${toYear}`;
    return this.http.get<JSON>(url).pipe(
      catchError(this.handleError<JSON>(`getPeriodicalBalance`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };

}

  
}
