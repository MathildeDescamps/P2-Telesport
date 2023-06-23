// On définit un modèle d'Olympic pour les données que l'on va récupérer de l'API.
export class Olympic {
    id!: number;
    country!: string;
    participations!: Array<{id: number, year: number, city: string, medalsCount: number, athleteCount: number}>
}