import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { SignupComponent } from './home/signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SelectComponent } from './dashboard/select/select.component';
import { HistoryComponent } from './dashboard/history/history.component';

const routes: Routes = [
  {path: '',  redirectTo: 'welcome', pathMatch: 'full'},
  {path: 'welcome', component: HomeComponent},
  {path: 'welcome/login', component: LoginComponent},
  {path: 'welcome/sign-up', component: SignupComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'dashboard/history', component: HistoryComponent},
  {path: 'dashboard/select', component: SelectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
