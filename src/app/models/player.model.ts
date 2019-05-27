export class Player {
    hp: number = 13;

    constructor(obj?: Partial<Player>) {
        if (obj)
            Object.assign(this, obj);
    }
}
