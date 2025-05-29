import { Component, OnInit } from '@angular/core';
import { PatientQueueService } from '../../services/patient-queue.service';
import { Patient } from '../../models/patient.model';
import { Room } from '../../models/room.model';

@Component({
  selector: 'app-create-patient-queue',
  templateUrl: './create-patient-queue.component.html'
})
export class CreatePatientQueueComponent implements OnInit {
  patients: Patient[] = [];
  rooms: Room[] = [];
  selectedPatientId!: number;
  selectedRoomId!: number;

  constructor(private service: PatientQueueService) {}

  ngOnInit(): void {
    this.service.getPatients().subscribe(res => this.patients = res);
    this.service.getRooms().subscribe(res => this.rooms = res);
  }

  submit(): void {
    if (this.selectedPatientId && this.selectedRoomId) {
      this.service.createQueue({
        patientId: this.selectedPatientId,
        roomId: this.selectedRoomId
      }).subscribe(() => alert('Lấy số thành công!'));
    }
  }
}