export class Bag {
    potion: number = 3;
    pokeball?: number;

    constructor(obj?: Partial<Bag>) {
        if (obj)
            Object.assign(this, obj);
    }
}
