export class Pokeballs {
    normal: number = 3;
    super: number = 1;
    ultra: number;

    constructor(obj?: Partial<Pokeballs>) {
        if (obj)
            Object.assign(this, obj);
    }
}
