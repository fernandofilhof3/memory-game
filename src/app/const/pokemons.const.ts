import { CardSkill, Card } from "../models/card.model";

export const PokemonsCards: Partial<Card>[] = [
    {
        id: 0,
        imgUrl: 'assets/images/pokemons/pikachu.png',
        skill: {
            damage: 1,

        }
    },
    {
        id: 1,
        imgUrl: 'assets/images/pokemons/bullbasaur.png',
        skill: {
            damage: 1,
        }
    },
    {
        id: 2,
        imgUrl: 'assets/images/pokemons/charmander.png',
        skill: {
            damage: 2,
            burn: true,
            duration: 2,
            imgUrl: 'assets/images/ui/fire.gif'
        }
    },
    {
        id: 3,
        imgUrl: 'assets/images/pokemons/squirtle.png',
        skill: {
            damage: 1
        }
    },
    {
        id: 4,
        imgUrl: 'assets/images/pokemons/meowth.png',
        skill: {
            damage: 1,
            multiStrike: true
        }
    },
    {
        id: 5,
        imgUrl: 'assets/images/pokemons/psyduck.png',
        skill: {
            damage: 1,
            confusion: true
        }
    },
    {
        id: 6,
        imgUrl: 'assets/images/pokemons/eevee.png',
        skill: {
            damage: 1
        }
    },
    {
        id: 7,
        imgUrl: 'assets/images/pokemons/caterpie.png',
        skill: {
            damage: 1
        }
    },
    {
        id: 8,
        imgUrl: 'assets/images/pokemons/mankey.png',
        skill: {
            damage: 2,
            multiStrike: true
        }
    }
];
