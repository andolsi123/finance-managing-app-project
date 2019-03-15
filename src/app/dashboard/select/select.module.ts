import { RouterModule } from '@angular/router'; // we also need angular router for Nebular to function properly
// tslint:disable-next-line:max-line-length
import { NbSidebarModule, NbLayoutModule, NbSidebarService, NbInputModule, NbButtonModule, NbCardModule, NbSelectModule, NbAccordionModule } from '@nebular/theme';
import { NgModule } from '@angular/core';

@NgModule({

  imports: [
    RouterModule, // RouterModule.forRoot(routes, { useHash: true }), if this is your app.module
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule,
    NbCardModule,
    NbSelectModule,
    NbAccordionModule,
    NbInputModule
  ],
  providers: [],
  bootstrap: [NbSidebarService],
})

export class SelectComponent { }
