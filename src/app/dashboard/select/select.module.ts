import { RouterModule } from '@angular/router'; // we also need angular router for Nebular to function properly
// tslint:disable-next-line:max-line-length
import { NbSidebarModule, NbLayoutModule, NbSidebarService, NbInputModule, NbButtonModule, NbCardModule, NbSelectModule, NbAccordionModule, NbToastrModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
// import { HistoryComponent } from '../../dashboard/history/history.component';


@NgModule({

  imports: [
    RouterModule, // RouterModule.forRoot(routes, { useHash: true }), if this is your app.module
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule,
    NbCardModule,
    NbSelectModule,
    NbAccordionModule,
    NbInputModule,
    NbToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [NbSidebarService],
  declarations: [],
})

export class SelectComponent { }
