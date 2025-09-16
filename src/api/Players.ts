
export interface Player {
    account_id: number,
    computed_mmr: number,
    steamid: string,
    avatar: string,
    avatarmedium: string,
    avatarfull: string,
    profileurl: string,
    personaname: string,
    last_login: string,
    full_history_time: string,
    cheese: number,
    fh_unavailable: boolean,
    loccountrycode: string,
    name: string,
    country_code: string,
    fantasy_role: number,
    team_id: number,
    team_name: string,
    team_tag: string,
    is_locked: boolean,
    is_pro: boolean,
    locked_until: number,
    computed_rating: number,
}

export interface PlayerInfo {
    rank_tier: number,
    leaderboard_rank: number,
    computed_rating: number,
    profile: Player,
}



export type Players = Player[]

export function fetchTopPlayers(): Promise<Players> {
    return fetch(`https://api.opendota.com/api/topPlayers`)
        .then((response) => response.json())
}

export function fetchProPlayers(): Promise<Players> {
    return fetch(`https://api.opendota.com/api/proPlayers`)
        .then((response) => response.json())
}

export function fetchPlayerId(playerId: number): Promise<PlayerInfo> {
    return fetch(`https://api.opendota.com/api/players/${playerId}`)
        .then((response) => response.json())
}
