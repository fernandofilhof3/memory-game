import { Card } from "./card.model";

export class DispositionCard extends Card  {
    i: number;
    j: number;

    constructor(obj?: Partial<DispositionCard>) {
        super(obj);
        if (obj)
            Object.assign(this, obj);
    }
}
