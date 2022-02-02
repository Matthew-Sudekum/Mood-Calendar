import { Component, Input, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { DayMoodModel } from '../objectModels/dayMood'; 

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit {

  today = new Date();
  currentDay: Date;
  currentMonth = this.today.getMonth();
  currentYear = this.today.getFullYear();
  firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
  lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);
  monthName = this.today.toLocaleString("default", { month:"long" });

  shortMonth: boolean = false;
  displayMoods: boolean = false;

  days = new Array();
  moodsAssigned: DayMoodModel[] = [];

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
    let classes = '';
    if(this.days[day].innerText != '') {
      let dayHolder = new Date(this.currentYear, this.currentMonth, day - this.firstDayOfMonth + 1);
      
      if(this.currentMonth == this.today.getMonth() && this.days[day].innerText == this.today.getDate()) {
        classes = 'select today';
        if(dayHolder != null && day == dayHolder.getDate() + this.firstDayOfMonth - 1) {
          classes += ' ' + this.returnMood(day - this.firstDayOfMonth + 1);
        }
      }
      else {
        classes = 'select';
        if(dayHolder != null && day == dayHolder.getDate() + this.firstDayOfMonth - 1) {
          classes += ' ' + this.returnMood(day - this.firstDayOfMonth + 1);
        }
      }
    }
    else {
      classes = '';
    }
    return classes;
  }


  //Calander Filling

  displayDayMoods(day: number) {
    if(this.days[day].innerText != '') {
      this.displayMoods = true;
      this.currentDay = new Date(this.currentYear, this.currentMonth, this.days[day].innerText);
    }
    else { }
  }

  displayChangedHandler(val: boolean) {
    this.displayMoods = val;
  }

  moodSelectionEventHandler(moodName: string) {
    this.addMood(moodName);
  }

  addMood(moodName: string) {
    console.log(this.currentDay);
    let datestring = this.currentDay.toLocaleDateString('default');
    let obj: DayMoodModel = { date: datestring, mood: moodName };
    if(this.moodsAssigned.length > 0) {
      for(let i = 0; i < this.moodsAssigned.length; i++) {
        if(this.moodsAssigned[i].date == datestring) {
          this.moodsAssigned[i].mood = moodName;
          i = this.moodsAssigned.length;
        }
        else if(i == this.moodsAssigned.length - 1 && this.moodsAssigned[i].date != datestring) {
          this.moodsAssigned.push(obj);
        }
      }
    }
    else {
      this.moodsAssigned.push(obj);
    }
  }

  returnMood(day: number) {
    let dateString = new Date(this.currentYear, this.currentMonth, day).toLocaleDateString('default');
    let returnStatement = '';
    for(let i = 0; i < this.moodsAssigned.length; i++) {
      if(this.moodsAssigned[i].date == dateString) {
        returnStatement = ' ' + this.moodsAssigned[i].mood;
        i = this.moodsAssigned.length;
      }
      else if (i == this.moodsAssigned.length - 1 && this.moodsAssigned[i].date != dateString) { }
    }
    return returnStatement;
  }
}
