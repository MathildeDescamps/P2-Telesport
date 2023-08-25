import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription} from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { OlympicsService } from 'src/app/core/services/olympics.service';
import { faMedal } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public faMedal = faMedal;
  public olympics: Olympic[] = [];
  private olympicsSub!: Subscription;
  public hasError:boolean = false;
  private errorSub!: Subscription;

  constructor(private olympicService: OlympicsService, private router: Router) {}

  // L'expression :void signifie que la fonction ne retourne rien.
  ngOnInit(): void {
    // On souscrit aux olympics et au hasError que l'on récupère depuis le service, puis on les stocke dans des variables locales.
    this.olympicsSub = this.olympicService.olympics.subscribe(olympics => this.olympics = olympics);
    this.errorSub = this.olympicService.hasError.subscribe(hasError => this.hasError = hasError);
  }

  // Une fois le composant détruit, on détruit aussi les souscriptions pour éviter les fuites de mémoire.
  ngOnDestroy(): void {
    this.olympicsSub.unsubscribe();
    this.errorSub.unsubscribe();
  }

  // On récupère les données à afficher dans le graphique.
  get data(): {"name": string, "value": number}[] {
    return this.olympics.map(olympic => {
      var totalMedals = 0;
      // On additionne le nombre de médailles de chaque participation pour obtenir le nombre total de médailles pour un olympic.
      olympic.participations.forEach(participation => totalMedals += participation.medalsCount);
      return {"name": olympic.country, "value": totalMedals};
    });
  }

  // On récupère le nombre de JOs.
  get numberOfJOs(): number {
    var yearsOfJOs: number[] = [];
    this.olympics.forEach(olympic => {
      olympic.participations.forEach(participation => {
        // Si l'année de la participation n'est pas déjà dans le tableau, on l'ajoute.
        if(!yearsOfJOs.find(year => participation.year === year)) {
          yearsOfJOs.push(participation.year);
        }
      })
    })
    // On retourne le nombre d'années différentes, càd le nombre de JOs.
    return yearsOfJOs.length;
  }

  // On récupère le nombre de pays différents, càd le nombre d'olympics.
  get numberOfCountries(): number {
    return this.olympics.length;
  }

  // Au click (= select) sur une pays dans le graphique, on redirige vers la page de détails du pays.
  onSelect(country: {"name": string}) {
    this.router.navigateByUrl("/details?country=" + country.name);
  }
}
