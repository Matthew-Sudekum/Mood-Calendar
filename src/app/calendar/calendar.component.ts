import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit {

  today = new Date();
  currentMonth = this.today.getMonth();
  currentYear = this.today.getFullYear();
  firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
  lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);

  constructor() { }

  ngOnInit(): void {
  }

  createCalendar() {
    this.clearCalendar();
    let el;
    let nestedEl;

    for(let i = 0; i < 42; i++){
      el = document.createElement("div");
      nestedEl = document.createElement("h2");
      if(i < this.firstDayOfMonth)
        nestedEl.innerText = "";
      if(i >= this.firstDayOfMonth && i < this.lastDayOfMonth.getDate() + this.firstDayOfMonth){
        let text = i - this.firstDayOfMonth + 1;
        nestedEl.innerText = text.toString();
      }
      if(i > this.lastDayOfMonth.getDate() + this.firstDayOfMonth - 1)
        nestedEl.innerText = "";
      el.appendChild(nestedEl);
      document.getElementById("days")?.appendChild(el);
    }
  }

  clearCalendar() {
    let days = document.getElementById("days");
    while(days?.firstChild){
      days.lastChild?.remove();
    }
  }

  findFirstDay(year: number, month: number) {
    let firstDay = new Date(year, month, 1);
    return firstDay.getDay();
  }

  findFirstDay1() {
    let firstDay = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
    return firstDay.getDay();
  }

  getNextCalendar() {
    if(this.currentMonth == 11){
      this.currentYear++;
      this.currentMonth = 0;
    }
    else{
      this.currentMonth++;
    }
    this.createCalendar();
  }

  getLastCalendar() {
    if(this.currentMonth == 0){
      this.currentYear--;
      this.currentMonth = 11;
    }
    else{
      this.currentMonth--;
    }
    this.createCalendar();
  }

}
