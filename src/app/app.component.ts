import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { OlympicsService } from './core/services/olympics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private olympicsService: OlympicsService) {}

  ngOnInit(): void {
    // On charge les données au démarrage de l'application.
    // Le pipe(take(1)) permet de se désabonner automatiquement de l'observable une fois que  la première valeur ait été émise.
    this.olympicsService.loadInitialData().pipe(take(1)).subscribe();
  }
}
