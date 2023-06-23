import { Component, OnInit, Input } from '@angular/core';
import { Olympic } from '../core/models/Olympic';
import { OlympicsService } from '../core/services/olympics.service';

@Component({
  selector: 'app-olympic',
  templateUrl: './olympic.component.html',
  styleUrls: ['./olympic.component.scss']
})

export class OlympicComponent {

  @Input() olympic!: Olympic;

  constructor() { }

}
