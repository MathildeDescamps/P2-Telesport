import { Participation} from './Participation';

// Here, we can use 'interface' instead of 'class'.
// An interface essentially defines the properties and type an object can have.
export interface Olympic {
    id: number;
    country: string;
    participations: Participation[];
}