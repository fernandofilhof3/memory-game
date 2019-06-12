import { CardSkill, Card } from '../models/card.model';

export const PokemonsCards: Partial<Card>[] = [
    {
        id: 0,
        name: 'Pikachu',
        imgUrl: 'assets/images/pokemons/pikachu.png',
        skill: {
            damage: 2,
        }
    },
    {
        id: 1,
        name: 'Bullbasaur',
        imgUrl: 'assets/images/pokemons/bullbasaur.png',
        skill: {
            damage: 1,
        }
    },
    {
        id: 2,
        name: 'Charmander',
        imgUrl: 'assets/images/pokemons/charmander.png',
        skill: {
            damage: 2,
            name: 'burn',
            duration: 2,
            imgUrl: 'assets/images/ui/fire.gif'
        }
    },
    {
        id: 3,
        name: 'Squirtle',
        imgUrl: 'assets/images/pokemons/squirtle.png',
        skill: {
            damage: 1
        }
    },
    {
        id: 4,
        name: 'Meowth',
        imgUrl: 'assets/images/pokemons/meowth.png',
        skill: {
            damage: 1,
            name: 'multiStrike',
            imgUrl: 'assets/images/ui/fist.png'
        }
    },
    {
        id: 5,
        name: 'Psyduck',
        imgUrl: 'assets/images/pokemons/psyduck.png',
        skill: {
            damage: 1,
            name: 'confusion'
        }
    },
    {
        id: 6,
        name: 'Eevee',
        imgUrl: 'assets/images/pokemons/eevee.png',
        skill: {
            damage: 1
        }
    },
    {
        id: 7,
        name: 'Caterpie',
        imgUrl: 'assets/images/pokemons/caterpie.png',
        skill: {
            damage: 1
        }
    },
    {
        id: 8,
        name: 'Mankey',
        imgUrl: 'assets/images/pokemons/mankey.png',
        skill: {
            damage: 1,
            name: 'multiStrike',
            imgUrl: 'assets/images/ui/fist.png'
        }
    },
    {
        id: 9,
        name: 'Abra',
        imgUrl: 'assets/images/pokemons/abra.png',
        skill: {
            damage: 1,
            name: 'teleport',
            imgUrl: 'assets/images/pokemons/abra.png'
        }
    },
    {
        id: 10,
        name: 'Venonat',
        imgUrl: 'assets/images/pokemons/venonat.png',
        skill: {
            damage: 1,
            duration: 3,
            name: 'poison',
            imgUrl: 'assets/images/ui/poison.gif'
        }
    }
];
