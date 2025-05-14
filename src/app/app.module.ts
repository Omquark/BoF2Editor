import { NgModule } from '@angular/core';
import { LucideAngularModule, Menu } from 'lucide-angular';
import { ToastService } from 'angular-toastify';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LucideAngularModule.pick({ Menu }),
    FormsModule
  ],
  providers: [
    ToastService
  ],
  bootstrap: [AppModule]
})
export class AppModule { }
