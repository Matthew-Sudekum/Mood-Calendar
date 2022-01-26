import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mood',
  templateUrl: './mood.component.html',
  styleUrls: ['./mood.component.css']
})
export class MoodComponent implements OnInit {

  @Input() display: boolean;
  @Output() displayChanged = new EventEmitter<boolean>();

  moodColors = ['red', 'orange', 'grey', 'yellow', 'green'];

  constructor() { }

  ngOnInit(): void {
  }

  closeDisplay(){
    this.displayChanged.emit(false);
  }

}
