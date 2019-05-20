export class Card  {
    id: number;
    name: string;
    imgUrl: string;
    fliped: boolean;

    constructor(obj?: Partial<Card>) {
        if (obj)
            Object.assign(this, obj);
    }
}
