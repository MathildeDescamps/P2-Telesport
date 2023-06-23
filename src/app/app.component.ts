import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { OlympicsService } from './core/services/olympics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private OlympicsService: OlympicsService) {}

  ngOnInit(): void {
  }
}
