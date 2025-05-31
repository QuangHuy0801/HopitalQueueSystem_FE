import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { PatientQueue } from '../models/patient-queue.model';


@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;

  private patientQueueSubject = new BehaviorSubject<PatientQueue[]>([]);
  patientQueue$ = this.patientQueueSubject.asObservable();

  constructor() { }

  public startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5000/notificationHub') 
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR Connected'))
      .catch(err => console.log('Error while starting connection: ' + err));

    // Đăng ký nhận message tên "ReceivePatientQueueUpdate" từ backend
    this.hubConnection.on('ReceivePatientQueueUpdate', (data: PatientQueue[]) => {
      console.log('ReceivePatientQueueUpdate data:', data);
      this.patientQueueSubject.next(data);
    });
  }

  public stopConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }
}