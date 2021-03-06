import { RouterModule } from '@angular/router'; // we also need angular router for Nebular to function properly
import { NbSidebarModule, NbLayoutModule, NbSidebarService, NbButtonModule, NbCardModule, NbInputModule } from '@nebular/theme';
import { NgModule } from '@angular/core';

@NgModule({

  imports: [
    RouterModule, // RouterModule.forRoot(routes, { useHash: true }), if this is your app.module
    NbLayoutModule,
    NbSidebarModule,
    NbButtonModule,
    NbCardModule,
    NbInputModule
  ],
  providers: [],
  bootstrap: [NbSidebarService]
})

export class LoginComponent { }
