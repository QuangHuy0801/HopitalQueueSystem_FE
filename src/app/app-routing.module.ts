import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewQueueComponent } from './features/pages/view-queue/view-queue.component';

const routes: Routes = [
  { path: '', component: ViewQueueComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
