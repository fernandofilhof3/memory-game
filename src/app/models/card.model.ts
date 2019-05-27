export class Card  {
    id: number;
    name: string;
    imgUrl: string;
    fliped: boolean;
    skill: string;
    attack: number;

    constructor(obj?: Partial<Card>) {
        if (obj)
            Object.assign(this, obj);
    }
}
