export class Player {
    hp: number = 13;
    status: number = 0;

    constructor(obj?: Partial<Player>) {
        if (obj)
            Object.assign(this, obj);
    }
}
