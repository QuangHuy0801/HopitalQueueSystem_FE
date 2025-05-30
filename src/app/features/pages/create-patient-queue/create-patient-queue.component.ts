import { Component } from '@angular/core';
import { QueueFormData } from '../../models/patient-queue.model';
import { NgForm } from '@angular/forms';
import { PatientQueueService } from '../../services/patient-queue.service';

@Component({
  selector: 'app-create-patient-queue',
  templateUrl: './create-patient-queue.component.html',
  styleUrls: ['./create-patient-queue.component.scss']
})
export class CreatePatientQueueComponent {
  formData: QueueFormData = {
    fullName: '',
    phone: '',
    dob: new Date(),
    cccd: '',
    hasInsurance: false
  };

  result: any = null;
  loading = false;
  errorMessage = '';

  constructor(private patientQueueService: PatientQueueService) {}

  handleSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.loading = true;
    this.errorMessage = '';

    this.patientQueueService.submitQueue(this.formData).subscribe({
      next: (res) => {
        this.result = res;
        this.loading = false;
        setTimeout(() => {
          this.printQueue();
        }, 100); 
        form.resetForm(); 
      },
      error: (err) => {
        this.errorMessage = 'Có lỗi xảy ra, vui lòng thử lại!';
        this.loading = false;
      }
    });
  }

  getFormattedQueueNumber(): string {
    if (!this.result) return '';
    const room = this.result.roomId.toString().padStart(2, '0');
    let queue = this.result.queueNumber;
    if (queue > 9999) {
      queue = 1;
    }
    const formattedQueue = queue.toString().padStart(4, '0');
    return `${room}-${formattedQueue}`;
  }

  printQueue() {
    const printContents = document.getElementById('printSection')!.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    location.reload();
  }
 getCurrentDateTime() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}
}
