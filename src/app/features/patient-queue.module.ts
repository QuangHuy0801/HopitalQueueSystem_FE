import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CreatePatientQueueComponent } from './pages/create-patient-queue/create-patient-queue.component';
import { ViewQueueComponent } from './pages/view-queue/view-queue.component';

// Import các Ant Design Modules cần thiết
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

@NgModule({
  declarations: [
    CreatePatientQueueComponent,
    ViewQueueComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzCardModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzCheckboxModule
  ]
})
export class PatientQueueModule {}
