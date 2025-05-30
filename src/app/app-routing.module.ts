import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallQueueComponent } from './features/pages/call-queue/call-queue.component';
import { CreatePatientQueueComponent } from './features/pages/create-patient-queue/create-patient-queue.component';
import { QueueDetailComponent } from './features/pages/queue-detail/queue-detail.component';
import { ViewQueueComponent } from './features/pages/view-queue/view-queue.component';

const routes: Routes = [
  { path: '', component: CreatePatientQueueComponent },
  { path: 'view', component: ViewQueueComponent },
  { path: 'view/roomId/:id', component: QueueDetailComponent },
  { path: 'view/call/:id', component:CallQueueComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
