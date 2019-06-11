export class Player {
    hp: number = 24;
    status: number [] = [];

    constructor(obj?: Partial<Player>) {
        if (obj)
            Object.assign(this, obj);
    }
}
