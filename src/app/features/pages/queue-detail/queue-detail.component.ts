import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-queue-detail',
  templateUrl: './queue-detail.component.html',
  styleUrls: ['./queue-detail.component.scss']
})
export class QueueDetailComponent implements OnInit {
 counterId = 1;

  currentQueue: number = 15;      
  upcomingQueues: number[] = []; 
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.counterId =  Number(id);
      }
    });
  }
}