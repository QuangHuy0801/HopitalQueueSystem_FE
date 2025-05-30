import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CreatePatientQueueComponent } from './pages/create-patient-queue/create-patient-queue.component';
import { ViewQueueComponent } from './pages/view-queue/view-queue.component';

// Import các Ant Design Modules cần thiết
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CallQueueComponent } from './pages/call-queue/call-queue.component';
import { QueueDetailComponent } from './pages/queue-detail/queue-detail.component';

@NgModule({
  declarations: [
    CreatePatientQueueComponent,
    ViewQueueComponent,
    QueueDetailComponent,
    CallQueueComponent
    // ViewQueueComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzCardModule,
    RouterModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzCheckboxModule
  ]
})
export class PatientQueueModule {}
