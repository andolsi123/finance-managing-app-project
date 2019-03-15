import { RouterModule } from '@angular/router'; // we also need angular router for Nebular to function properly
// tslint:disable-next-line:max-line-length
import { NbSidebarModule, NbLayoutModule, NbSidebarService, NbButtonModule, NbCardModule, NbSelectModule, NbContextMenuModule, NbMenuModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { HistoryComponent } from './history/history.component';
import { SelectComponent } from './select/select.component';

@NgModule({

  imports: [
    RouterModule, // RouterModule.forRoot(routes, { useHash: true }), if this is your app.module
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule,
    NbMenuModule,
    NbCardModule,
    NbSelectModule,
    NbContextMenuModule
  ],
  providers: [],
  bootstrap: [NbSidebarService],
  declarations: [HistoryComponent, SelectComponent]
})

export class DashboardComponent { }
