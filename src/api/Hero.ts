export interface Hero {
    id: number,
    name: string,
    localized_name: string,
    primary_attr: string,
    attack_type: string,
    roles: [
        string
    ]
}

type Heroes = Hero[]

export interface HeroAbilities {
    abilities: string[],
    facets: [],
    talents: [],
}

export interface HeroesAbilities {
    [hero: string]: HeroAbilities,
}


export function fetchHeroes(): Promise<Heroes> {
    return fetch(`https://api.opendota.com/api/heroes`)
        .then((response) => response.json())
}

export function fetchHeroesAbilities(): Promise<HeroesAbilities> {
    return fetch(`https://api.opendota.com/api/constants/hero_abilities`)
        .then((response) => response.json())
}
