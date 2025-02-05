import { Routes } from '@angular/router';
import { DonateComponent } from './components/donate/donate.component';
import { CharitiesComponent } from './components/charities/charities.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { RegisterCharityComponent } from './components/register-charity/register-charity.component';
import { CharityListComponent } from './components/charity-list/charity-list.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { DonationAnalyticsComponent } from './components/donation-analytics/donation-analytics.component';

export const routes: Routes = [
    { path: 'donate', component: DonateComponent },
    { path: 'admin', component: AdminDashboardComponent },
    { path: 'transactions', component: TransactionsComponent },
    { path: 'charities', component: CharityListComponent },
    { path: 'register-charity', component: RegisterCharityComponent },
    { path: '', component:CharitiesComponent },
    { path: 'analytics', component: DonationAnalyticsComponent },
];

