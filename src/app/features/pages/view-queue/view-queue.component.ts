import { Component, OnInit } from '@angular/core';
import { ViewQueueService } from '../../services/view-queue.service';
import { Room } from '../../models/room.model';

@Component({
  selector: 'app-view-queue',
  templateUrl: './view-queue.component.html',
  styleUrls: ['./view-queue.component.scss']
})
export class ViewQueueComponent implements OnInit {
  roomList: Room[] = [];

  constructor(private viewQueueService: ViewQueueService) { }

 ngOnInit(): void {
    this.viewQueueService.getRooms().subscribe({
      next: (data) => {
        this.roomList = data;
      },
      error: (err) => {
        console.error('Error loading rooms:', err);
      }
    });
  }
}