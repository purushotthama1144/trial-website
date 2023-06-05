import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BanSymbolComponent } from './ban-symbol/ban-symbol.component';
import { BlockedScripsComponent } from './blocked-scrips/blocked-scrips.component';
import { ExpiryContractsComponent } from './expiry-contracts/expiry-contracts.component';
import { ExposureComponent } from './exposure/exposure.component';
import { RmsUpdateComponent } from './rms-update.component';
import { RmsUpdatesComponent } from './rms-updates/rms-updates.component';
import { TenderPeriodContractsComponent } from './tender-period-contracts/tender-period-contracts.component';

const routes: Routes = [
    {
        path: '', component: RmsUpdateComponent, data: { breadcrumb: 'RMS Live' },
        children: [
            { path: '', redirectTo: '/rms-live-updates/exposures', pathMatch: 'full' },
            { path: 'exposures', component: ExposureComponent, data: { breadcrumb: 'Exposures' } },
            { path: 'ban-symbols', component: BanSymbolComponent, data: { breadcrumb: 'Ban Symbols' } },
            { path: 'expiry-contracts', component: ExpiryContractsComponent, data: { breadcrumb: 'Expiry Contracts' } },
            { path: 'tender-period-contract', component: TenderPeriodContractsComponent, data: { breadcrumb: 'Tender Period Contracts' } },
            { path: 'rms-updates', component: RmsUpdatesComponent, data: { breadcrumb: 'Rms Updates' } },
            { path: 'blocked-scrips', component: BlockedScripsComponent, data: { breadcrumb: 'Blocked Scrips' } },
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RmsUpdateRoutingModule { }