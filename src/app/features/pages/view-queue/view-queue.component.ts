import { Component } from '@angular/core';
import { QueueFormData } from '../../models/patient-queue.model';
import { NgForm } from '@angular/forms';
import { PatientQueueService } from '../../services/patient-queue.service';

@Component({
  selector: 'app-view-queue',
  templateUrl: './view-queue.component.html',
  styleUrls: ['./view-queue.component.scss']
})
export class ViewQueueComponent {
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

    // Gửi dữ liệu xuống backend qua service
    this.patientQueueService.submitQueue(this.formData).subscribe({
      next: (res) => {
        this.result = res;
        this.loading = false;
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

}

