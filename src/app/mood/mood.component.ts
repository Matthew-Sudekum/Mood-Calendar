import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mood',
  templateUrl: './mood.component.html',
  styleUrls: ['./mood.component.css']
})
export class MoodComponent implements OnInit {

  @Output() displayChanged = new EventEmitter<boolean>();
  
  @Input() dayNumber: Date;

  @Output() moodSelection = new EventEmitter<string>();

  moodColors = ['red', 'orange', 'grey', 'yellow', 'green'];
  moods = ['dreadful', 'bad', 'fine', 'good', 'great'];

  constructor() { }

  ngOnInit(): void {
  }

  closeDisplay(){
    this.displayChanged.emit(false);
  }

  chooseMood(mood: string){
    this.moodSelection.emit(mood);
    this.closeDisplay();
  }

  showDayTitle(){
    return this.dayNumber.toLocaleString("default", { weekday: 'long', month: 'short', day: 'numeric' });
  }

  moodSetting(mood: number){
    return this.moods[mood];
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}
