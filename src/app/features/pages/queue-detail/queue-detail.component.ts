import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Room } from '../../models/room.model';
import { ViewQueueService } from '../../services/view-queue.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SignalRService } from '../../services/signalr.service';  
import { Subscription } from 'rxjs';
import { PatientQueue } from '../../models/patient-queue.model';

@Component({
  selector: 'app-queue-detail',
  templateUrl: './queue-detail.component.html',
  styleUrls: ['./queue-detail.component.scss']
})
export class QueueDetailComponent implements OnInit,OnDestroy {
   counterId: number | null = null;
   roomData!: Room;
   currentQueue: number = 15;      
   upcomingQueues: number[] = [];
   private signalRSub?: Subscription;
 
   constructor(
     private route: ActivatedRoute, 
     private viewQueueService: ViewQueueService,
     private notification: NzNotificationService,
     private signalRService: SignalRService  // inject SignalRService
   ) {}
 
   ngOnInit(): void {
     this.route.paramMap.subscribe(params => {
       const id = params.get('id');
       if (id) {
         this.counterId = Number(id);
         this.loadRoom(this.counterId);
         this.loadQueue(this.counterId);
       }
     });
 
     this.signalRService.startConnection();

     this.signalRSub = this.signalRService.patientQueue$.subscribe((queue: PatientQueue[]) => {
        this.processQueue(queue);
     });
   }
 
   ngOnDestroy(): void {
     this.signalRSub?.unsubscribe();
     this.signalRService.stopConnection();
   }
 
   loadRoom(id: number) {
     this.viewQueueService.getRoomById(id).subscribe({
       next: (room) => {
         this.roomData = room;
       },
       error: (err) => {
         console.error('Lỗi khi lấy phòng:', err);
       }
     });
   }
   loadQueue(id: number) {
  this.viewQueueService.getQueueByIdRoom(id).subscribe({
    next: (queue) => this.processQueue(queue),
    error: (err) => {
      console.error('Lỗi khi lấy hàng đợi:', err);
    }
  });
}
private processQueue(queue: PatientQueue[]) {
  if (!queue) return;

  const inProcessPatient = queue.find(p => p.status === 'In_process');
  this.currentQueue = inProcessPatient ? inProcessPatient.queueNumber : 0;

  this.upcomingQueues = queue
    .filter(p => p.status === 'Waiting')
    .map(p => p.queueNumber)
    .sort((a, b) => a - b);
}
formattedCurrentQueue(): string {
  if (!this.roomData?.roomName || !this.currentQueue) {
    return '';
  }
  const room = this.roomData.roomName.padStart(2, '0');
  const queue = this.currentQueue.toString().padStart(4, '0');
  return `${room}-${queue}`;
}
formattedUpcomingQueues(): string[] {
  if (!this.roomData?.roomName || !this.upcomingQueues?.length) {
    return [];
  }

  const room = this.roomData.roomName.padStart(2, '0');

  return this.upcomingQueues.map(q => {
    const queue = q.toString().padStart(4, '0');
    return `${room}-${queue}`;
  });
}
}