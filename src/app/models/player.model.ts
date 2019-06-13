import { Bag } from "./bag.model";

export class Player {
    hp: number = 24;
    status: number [] = [];
    bag: Bag = new Bag();

    constructor(obj?: Partial<Player>) {
        if (obj)
            Object.assign(this, obj);
    }
}
