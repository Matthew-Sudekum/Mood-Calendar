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
  days = new Array();

  constructor() { }

  ngOnInit(): void {
    this.createDays();
  }

  createDays() {
    let el;
    for(let i = 0; i < 42; i++){
      el = document.createElement("h2"); 
      if(i < this.firstDayOfMonth)
        el.innerText = "";
      if(i >= this.firstDayOfMonth && i < this.lastDayOfMonth.getDate() + this.firstDayOfMonth){
        let text = i - this.firstDayOfMonth + 1;
        el.innerText = text.toString();
      }
      if(i > this.lastDayOfMonth.getDate() + this.firstDayOfMonth - 1)
        el.innerText = "";
      this.days.push(el);
    }
    this.cullDays();
  }

  clearCalendar() {
    while(this.days[0] != null){
      this.days.pop();
    }
  }

  getNextCalendar() {
    if(this.currentMonth == 11){
      this.currentYear++;
      this.currentMonth = 0;
    }
    else{
      this.currentMonth++;
    }
    this.firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
    this.lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);
    this.clearCalendar();
    this.createDays();
  }

  getLastCalendar() {
    if(this.currentMonth == 0){
      this.currentYear--;
      this.currentMonth = 11;
    }
    else{
      this.currentMonth--;
    }
    this.firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
    this.lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);
    this.clearCalendar();
    this.createDays();
  }

  cullDays() {
    if (this.days[36].innerText != ""){
      return;
    }
    else{
      for(let i = 42; i > 35; i--) {
        this.days.pop();
      }
    }
  }

}
