import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalanceDetailsComponent } from './balance-details/balance-details.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  { path: 'balancedetails', component: BalanceDetailsComponent },
  { path: 'uploadfile', component: UploadFileComponent },
  { path: 'reports', component: ReportsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
