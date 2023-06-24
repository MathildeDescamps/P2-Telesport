import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

// @Injectable est une décoration qui indique que la classe peut être utilisée comme un service injectable. 
// Cela signifie que vous pouvez injecter une instance de cette classe dans d'autres classes de votre application (composant,  service...etc).
@Injectable({
  providedIn: 'root',
})

export class OlympicsService {
  // On définit l'URL de l'API, qui est un fichier JSON dans notre cas.
  private olympicUrl = './assets/mock/olympic.json';
  // BehaviorSubject est un type d'observable qui permet de stocker la dernière valeur émise par l'observable.
  // Il lui faut une valeur par défaut, qui sera émise jusqu'à ce qu'elle soit changée avec la méthode next().
  // A partir de là, ce sera la nouvelle valeur qui sera émise.
  // L'observable $olympics, émettra donc un tableau d'Olympics, qui sera vide au départ.
  private olympics$ = new BehaviorSubject<any>(undefined);

  // On définit un autre observable, qui sera un booléen, et qui sera utilisé pour savoir si on a une erreur ou pas.
  hasError$ = new BehaviorSubject<boolean>(false);

  // On définit un tableau d'Olympics, qui sera utilisé pour stocker les données de l'API.
  //olympics: Olympic[] = [];

  // On injecte le service HttpClient dans le constructeur de notre service, pour pouvoir faire des requêtes HTTP.
  constructor(private http: HttpClient) {};

  // On crée une fonction qui va nous permettre de récupérer les données de l'API.
  loadInitialData() {
    return this.http.get<any>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(null);
        return caught;
      })
    );
  }

  getAllOlympics() {
    return this.olympics$.asObservable();
  }

  /* getOlympics(): Olympic[] {
    console.log("Inside of getOlympics function : ", this.olympics);
    return this.olympics;
  }; */
}

//////////      INITIAL CODE    //////////
/* export class OlympicService {
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<any>(undefined);

  constructor(private http: HttpClient) {}

  loadInitialData() {
    return this.http.get<any>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // TODO: improve error handling
        console.error(error);
        // can be useful to end loading state and let the user know something went wrong
        this.olympics$.next(null);
        return caught;
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }
} */
//////////      END OF INITIAL CODE    //////////