import { Component, OnInit, Input } from '@angular/core';
import { Olympic } from '../core/models/Olympic';
import { OlympicsService } from '../core/services/olympics.service';

@Component({
  selector: 'app-olympics',
  templateUrl: './olympics.component.html',
  styleUrls: ['./olympics.component.scss']
})

export class OlympicsComponent {
  olympics!: Olympic[];

  constructor(private olympicsService: OlympicsService) {}

  ngOnInit() {
    this.olympics = this.olympicsService.getAllOlympics();
    console.log("Inside olympics component : ", this.olympics);
  }

}
