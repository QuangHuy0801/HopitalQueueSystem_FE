export interface PatientQueue {
  id: number;
  patientId: number;
  roomId: number;
  queueNumber: number;
  priorityLevel: number;
  status: string;
  createdAt: string;
}

export interface QueueFormData {
  fullName: string;
  phone: string;
  cccd: string;
  dob:Date
  hasInsurance: boolean;
}