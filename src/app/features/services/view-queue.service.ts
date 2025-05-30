import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PatientQueue, QueueFormData } from '../models/patient-queue.model';
import { Patient } from '../models/patient.model';
import { Room } from '../models/room.model';

@Injectable({ providedIn: 'root' })
export class ViewQueueService {
  private baseUrl = 'http://localhost:5000/api/ViewQueue';

  constructor(private http: HttpClient) {}
  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.baseUrl}/rooms`);
  }
  getRoomById(id: number): Observable<Room> {
  return this.http.get<Room>(`${this.baseUrl}/room/${id}`);
}
  
}