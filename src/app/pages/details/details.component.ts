import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Olympic } from "src/app/core/models/Olympic";
import { OlympicsService } from "src/app/core/services/olympics.service";

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

    private countrySub!: Subscription;
    private olympicsSub!: Subscription;
    private country: string = "";
    public olympic?: Olympic;

    constructor(private olympicService: OlympicsService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        // On souscrit aux paramètres de l'URL pour récupérer la pays choisi et le stocker dans la variable locale 'country'.
        this.countrySub = this.route.queryParamMap.subscribe(params => {
            const country = params.get("country");
            if (country) {
                this.country = country;
            }
        });
        // On récupère l'Olympic correspondant au pays choisi grâce à la fonction getOlympicByCountry qui renvoie un observable, auquel on souscrit.
        this.olympicsSub = this.olympicService.getOlympicByCountry(this.country).subscribe(olympic => this.olympic = olympic);
    }

    // Lorsque le composant est détruit, on se désabonne des observables pour éviter les fuites de mémoire.
    ngOnDestroy(): void {
        this.countrySub.unsubscribe();
        this.olympicsSub.unsubscribe();
    }

    // Le graphique que l'on va créer représente le nombre de médailles gagnées par participation (= par année), pour le pays choisi.
    // On formate les données au format requis par ngx-charts pour pouvoir afficher le graphique.
    // "name" sera le nom du pays, et series un tableau d'objects qui contiendront l'année et le nombre de médailles gagnées.
    get data(): { "name": string, "series": {"name": string, "value": number}[] }[] {
        const series: {"name": string, "value": number}[] = [];
        this.olympic!.participations.forEach(participation => {
            if ((series.find(serie => (serie.name === "" + participation.year && serie.value === participation.medalsCount))) === undefined) {
                series.push({ "name": "" + participation.year, "value": participation.medalsCount });
            } 
        });
        return [{ "name": this.olympic!.country, "series": series }];
    }

    // On récupère le nombre total de médailles gagnées par le pays choisi.
    get totalMedals(): number {
        var total = 0;
        this.olympic!.participations.forEach(participation => total += participation.medalsCount);
        return total;
    }

    // On récupère le nombre total d'athlètes ayant participé aux JO pour le pays choisi.
    get totalAthletes(): number {
        var total = 0;
        this.olympic!.participations.forEach(participation => total += participation.athleteCount);
        return total;
    }

}
