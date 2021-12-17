import { Component, ViewChild } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { CalendarService } from '../services/calendar.service';

@Component({
  selector: 'app-month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.scss']
})
export class MonthPickerComponent {
  @ViewChild(MatCalendar, {static: false}) calendar!: MatCalendar<Date>;

  constructor(private calendarService: CalendarService) { }

  monthSelected(month: Date) {
    this.calendarService.month = month.getMonth();
    setTimeout(() => {
      this.calendar.currentView = 'year';
    })
  }

  yearSelected(year: Date) {
    this.calendarService.year = year.getFullYear();
  }
}
