import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

// @Injectable est une décoration qui indique que la classe peut être utilisée comme un service injectable. 
// Cela signifie que vous pouvez injecter une instance de cette classe dans d'autres classes de votre application (composant,  service...etc).
@Injectable({
  providedIn: 'root',
})

export class OlympicsService {

  private olympicUrl = './assets/mock/olympic.json';
  // BehaviorSubject est un type d'observable qui permet de stocker la dernière valeur émise par l'observable.
  // Il lui faut une valeur par défaut, qui sera émise jusqu'à ce qu'elle soit changée avec la méthode next().
  // A partir de là, ce sera la nouvelle valeur qui sera émise.
  // L'observable $olympics, émettra donc un tableau d'Olympics, qui sera vide au départ.
  private olympics$ = new BehaviorSubject<Olympic[]>([]);
  // On définit un autre observable, qui sera un booléen, et qui sera utilisé pour savoir si on a une erreur ou pas.
  private hasError$ = new BehaviorSubject<boolean>(false);

  // On injecte le service HttpClient dans le constructeur de notre service, pour pouvoir faire des requêtes HTTP.
  constructor(private http: HttpClient) {};

  // On crée une fonction qui va nous permettre de récupérer les données de l'API.
  loadInitialData() {
    // La méthode asynchrone HttpClient.get() fait une requête HTTP get et retourne un observable.
    // Cet observable emmet les données demandées lorsque la réponse du serveur est reçue.
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error, caught) => {
        // S'il y a une erreur, on change la valeur de l'observable hasError$ à true.
        this.hasError$.next(true);
        // On log l'erreur dans la console.
        console.log("The following error occurred : ", error);
        // On vide le tableau d'Olympics pour faire comprendre au user que quelque chose s'est produit.
        this.olympics$.next([]);
        return caught;
      })
    );
  }

  // On utilise un 'getter', ou 'accessor' de TypeScript.
  // Cette méthode renvoie la valeur de la propriété ciblée, ici olympics, qui est de type observable.
  get olympics(): Observable<Olympic[]> {
    return this.olympics$.asObservable();
  }
  // De la même manière, on récupère la valeur de l'observable hasError$.
  get hasError(): Observable<boolean> {
    return this.hasError$.asObservable();
  }

  // On crée une méthode qui va nous permettre de trier les Olympic par pays.
  // Elle prend en paramètre un string, qui sera le pays.
  // Elle renvoie un observable d'Olympic, ou undefined si aucun Olympic n'est trouvé.
  getOlympicByCountry(country: string): Observable<Olympic | undefined> {
    return this.olympics.pipe(
      map(
        olympics => olympics.find(olympic => olympic.country === country)
      )
    );
  }
}