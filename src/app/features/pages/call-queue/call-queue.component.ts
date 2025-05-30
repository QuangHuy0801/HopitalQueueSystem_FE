import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Room } from '../../models/room.model';
import { ViewQueueService } from '../../services/view-queue.service';

@Component({
  selector: 'app-call-queue',
  templateUrl: './call-queue.component.html',
  styleUrls: ['./call-queue.component.scss']
})
export class CallQueueComponent implements OnInit {
counterId: number | null = null;
roomData!: Room;
  currentQueue: number = 15;      
  upcomingQueues: number[] = []; 
  constructor(private route: ActivatedRoute, private viewQueueService: ViewQueueService) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.counterId = Number(id);
        this.loadRoom(this.counterId);
      }
    });
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
  callNextQueue() {
  }
}