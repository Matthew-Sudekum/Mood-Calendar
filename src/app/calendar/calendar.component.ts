import { Component, Input, OnInit } from '@angular/core';
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
  monthName = this.today.toLocaleString("default", { month:"long" });
  shortMonth: boolean = false;

  @Input() displayMoods: boolean = false;
  currentDay: Date;

  constructor() { }

  ngOnInit(): void {
    this.createDays();
  }


  //Calendar Building

  createDays() {
    let el;
    for(let i = 0; i < 42; i++){
      if(i > this.lastDayOfMonth.getDate() + this.firstDayOfMonth - 1){
        if(i == 35){ //35 is start of last row
          this.shortMonth = true;
          i = 42;          
        }
        else{
          if(this.shortMonth != false)
            this.shortMonth = false;
          el = document.createElement("h2");
          el.innerText = "";
          this.days.push(el);
        }
      }
      else{
        el = document.createElement("h2"); 
        if(i < this.firstDayOfMonth)
          el.innerText = "";
        if(i >= this.firstDayOfMonth && i < this.lastDayOfMonth.getDate() + this.firstDayOfMonth){
          let text = i - this.firstDayOfMonth + 1;
          el.innerText = text.toString();
          if(i == this.today.getDate() + this.firstDayOfMonth)
            el.classList.add("today");
        }
        this.days.push(el);
      }
    }
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
    this.setDateInfo();
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
    this.setDateInfo();
    this.clearCalendar();
    this.createDays();
  }

  setDateInfo() {
    this.firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
    this.lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);
    this.monthName = new Date(this.currentYear, this.currentMonth, 1).toLocaleString("default", { month:"long" });
  }

  classSetting(day: number) {
    if(this.days[day].innerText != '') {
      if(this.currentMonth == this.today.getMonth() && this.days[day].innerText == this.today.getDate())
        return 'select today';
      else
        return 'select';
    }
    else {
      return '';
    }
  }


  //Component Sharing

  displayDayMoods(int: number){
    if(this.days[int].innerText != '') {
      this.displayMoods = true;
      this.currentDay = new Date(this.currentYear, this.currentMonth, this.days[int].innerText);
      console.log(this.currentDay);
    }
    else {
      console.log(int);
    }
  }

  displayChangedHandler(val: boolean){
    this.displayMoods = val;
  }
}
