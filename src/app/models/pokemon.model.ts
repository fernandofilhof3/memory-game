export class Pokemon  {
    id: number;
    name: string;
    imgUrl: string;
    fliped: boolean;

    constructor(obj?: Partial<Pokemon>) {
        if (obj)
            Object.assign(this, obj);
    }
}
