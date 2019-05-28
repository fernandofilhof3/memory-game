
export class CardSkill {
    damage: number;
    duration?: number;
    multiStrike?: boolean;
    burn?: boolean;
    confusion?: boolean;
    teleport?: boolean;
    imgUrl?: string;

    constructor(obj?: Partial<CardSkill>) {
        if (obj)
            Object.assign(this, obj);
    }
}
export class Card {
    id: number;
    name: string;
    imgUrl: string;
    fliped: boolean = true;
    animation: string;
    skill: CardSkill;

    constructor(obj?: Partial<Card>) {
        if (obj) {
            Object.assign(this, obj);
            if (this.skill) {
                this.skill = new CardSkill(this.skill);
            }
        }
    }
}

