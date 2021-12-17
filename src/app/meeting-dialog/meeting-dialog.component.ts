import { Component } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-meeting-dialog',
  templateUrl: './meeting-dialog.component.html',
  styleUrls: ['./meeting-dialog.component.scss'],
})
export class MeetingDialogComponent {
  hours = this.generateTimeSeries(30);
  partisipants: string[] = [];

  myForm = new FormGroup({
    title: new FormControl(null, Validators.required),
    startingTime: new FormControl(null, Validators.required),
    endingTime: new FormControl(null, Validators.required),
    description: new FormControl(null),
    participants: new FormControl('', Validators.required),
  });

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(public dialogRef: MatDialogRef<MeetingDialogComponent>) {}

  generateTimeSeries(step: number) {
    const dt = new Date(1970, 0, 1);
    const rc = [];
    while (dt.getDate() === 1) {
      rc.push(
        dt.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      );
      dt.setMinutes(dt.getMinutes() + step);
    }
    return rc;
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim() && this.partisipants.length < 5) {
      this.partisipants.push(value.trim());
      this.myForm.get('participants')?.setValue(this.partisipants);
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(partisipant: string): void {
    const index = this.partisipants.indexOf(partisipant);
    if (index >= 0) {
      this.partisipants.splice(index, 1);
    }
    this.myForm.get('participants')?.setValue(this.partisipants);
  }

  submitForm() {
    this.dialogRef.close(this.myForm.value);
  }
}
