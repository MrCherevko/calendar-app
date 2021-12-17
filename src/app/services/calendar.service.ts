import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Meeting {
  title: string;
  startingTime: string;
  endingTime: string;
  description: string;
  participants: string[];
}

@Injectable({
  providedIn: 'any'
})
export class CalendarService {

  constructor() { }

  private _monthAndYear$ = new BehaviorSubject({month: new Date().getMonth(), year: new Date().getFullYear()});

  get mountAndYearObservable() {
    return this._monthAndYear$.asObservable();
  }

  set month(month: number) {
    const subject = this._monthAndYear$.getValue();
    this._monthAndYear$.next({...subject, month})
  }

  set year(year: number) {
    const subject = this._monthAndYear$.getValue();
    this._monthAndYear$.next({...subject, year})
  }

  _meetings: {[id: string]: Meeting[]} = {}

  get meetings() {
    return this._meetings;
  }

  setMeeting(dayId: string ,meeting: Meeting) {
    if(!this._meetings[dayId]) {
      this._meetings[dayId] = [];
    }
    this._meetings[dayId].push(meeting);
  }

  getMonthView(month: number, year: number): Date[] {
    var date = new Date(year, month, 1);
    var days = [];
    if (date.getDay()) {
      date.setDate(date.getDate() - date.getDay());
      for (let i = 0; i < 35; i++) {
        days.push(new Date(date));
        date.setDate(date.getDate() + 1);
      }
    }
    return days;
  }
}
