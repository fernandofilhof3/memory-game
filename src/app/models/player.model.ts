export class Player {
    hp: number = 26;
    status: number [] = [];

    constructor(obj?: Partial<Player>) {
        if (obj)
            Object.assign(this, obj);
    }
}
