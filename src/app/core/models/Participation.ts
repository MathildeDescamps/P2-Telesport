// On définit un modèle de Participation pour les données que l'on va récupérer de l'API.
export class Participation {
    id!: number;
    year!: number;
    city!: string;
    medalsCount!: number;
    athleteCount!: number;
}