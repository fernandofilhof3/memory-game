import { Pokeballs } from "./pokeballs.model";

export class Bag {
    potion: number = 3;
    pokeballs: Pokeballs = new Pokeballs();

    constructor(obj?: Partial<Bag>) {
        if (obj)
            Object.assign(this, obj);
    }
}
