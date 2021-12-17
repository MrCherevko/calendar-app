import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MeetingDialogComponent } from '../meeting-dialog/meeting-dialog.component';
import { CalendarService, Meeting } from '../services/calendar.service';

export interface Day {
  id: string;
  dayName: string;
  date: number;
  month: number;
  disabled: boolean;
  meetings: Meeting[];
}

@Component({
  selector: 'app-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.scss'],
})
export class MonthViewComponent implements OnInit {
  days!: Observable<Day[]>;

  constructor(private calendarService: CalendarService, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.setDays();
  }

  setDays() {
    this.days = this.calendarService.mountAndYearObservable.pipe(
      map<any, Day[]>(({ year, month }) => {
        return this.calendarService.getMonthView(month, year).map((day: Date) => {
          return {
            id: day.toISOString(),
            dayName: day.toLocaleDateString('en-US', { weekday: 'short' }),
            date: day.getDate(),
            month: day.getMonth(),
            disabled: day.getMonth() !== month,
            meetings: this.calendarService.meetings[day.toISOString()]
          };
        });
      })
    );
  }

  dayClicked(day: Day) {
    if(day.disabled) {
      this.calendarService.month = day.month;
      return;
    }

    if(day.meetings && day.meetings.length >= 5) {
      return;
    }

    const dialogRef = this.matDialog.open(MeetingDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(meeting => {
      this.calendarService.setMeeting(day.id, meeting);
      this.setDays();
    });

  }
}
