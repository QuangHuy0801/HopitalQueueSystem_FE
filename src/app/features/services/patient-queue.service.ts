import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PatientQueue, QueueFormData } from '../models/patient-queue.model';
import { Patient } from '../models/patient.model';
import { Room } from '../models/room.model';

@Injectable({ providedIn: 'root' })
export class PatientQueueService {
  private baseUrl = 'http://localhost:5000/api/PatientQueue/take-number';

  constructor(private http: HttpClient) {}

  submitQueue(data: QueueFormData): Observable<any> {
    return this.http.post<any>(this.baseUrl, data);
  }

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.baseUrl}/patients`);
  }
}