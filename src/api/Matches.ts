export interface RecentMatch {
    match_id: number,
    player_slot: number,
    radiant_win: boolean,
    hero_id: number,
    start_time: number,
    duration: number,
    game_mode: number,
    lobby_type: number,
    version: number,
    kills: number,
    deaths: number,
    assists: number,
    average_rank: number,
    xp_per_min: number,
    gold_per_min: number,
    hero_damage: number,
    tower_damage: number,
    hero_healing: number,
    last_hits: number,
    lane: number,
    lane_role: number,
    is_roaming: boolean,
    cluster: number,
    leaver_status: number,
    party_size: number,
    hero_variant: number,
}

export type RecentMatches = RecentMatch[]


export interface MatchById {
    barracks_status_dire: number,
    barracks_status_radiant: number,
    cluster: number,
    dire_score: number,
    duration: number,
    engine: number,
    first_blood_time: number,
    flags: number,
    game_mode: number,
    human_players: number,
    leagueid: number,
    lobby_type: number,
    match_id: number,
    match_seq_num: number,
    picks_bans: [],
    players: PlayerInMatch[],
    pre_game_duration: number,
    radiant_score: number,
    radiant_win: boolean,
    region: number,
    start_time: number,
    tower_status_dire: number,
    tower_status_radiant: number,
}
export interface PlayerInMatch {
    abandons: number,
    ability_upgrades_arr: [],
    aghanims_scepter: number,
    aghanims_shard: number,
    assists: number,
    backpack_0: number,
    backpack_1: number,
    backpack_2: number,
    benchmarks: {},
    cluster: number,
    deaths: number,
    denies: number,
    duration: number,
    game_mode: number,
    gold: number,
    gold_per_min: number,
    gold_spent: number,
    hero_damage: number,
    hero_healing: number,
    hero_id: number,
    hero_variant: number,
    isRadiant: number,
    is_contributor: number,
    is_subscriber: number,
    item_0: number,
    item_1: number,
    item_2: number,
    item_3: number,
    item_4: number,
    item_5: number,
    item_neutral: number,
    item_neutral2: number,
    kda: number,
    kills: number,
    kills_per_min: number,
    last_hits: number,
    leaver_status: number,
    level: number,
    lobby_type: number,
    lose: number,
    moonshard: number,
    name: string,
    net_worth: number,
    personaname: string,
    patch: number,
    player_slot: number,
    radiant_win: number,
    region: number,
    start_time: number,
    team_number: number,
    team_slot: number,
    total_gold: number,
    total_xp: number,
    tower_damage: number,
    win: number,
    xp_per_min: number,
    account_id: number,
}

export interface TeamMatch {
    match_id: number,
    radiant_win: boolean,
    radiant_score: number,
    dire_score: number,
    radiant: boolean,
    duration: number,
    start_time: number,
    leagueid: number,
    league_name: string,
    cluster: number,
    opposing_team_id: number,
    opposing_team_name: string,
    opposing_team_logo: string,
}

export type TeamMatches = TeamMatch[]

export function fetchRecentMatches(playerId: number): Promise<RecentMatches> {
    return fetch(`https://api.opendota.com/api/players/${playerId}/recentMatches`)
        .then((response) => response.json())
}

export function fetchMatchId(matchId: number): Promise<MatchById> {
    return fetch(`https://api.opendota.com/api/matches/${matchId}`)
        .then((response) => response.json())
}

export function fetchRecentTeamMatches(teamId: number): Promise<TeamMatches> {
    return fetch(`https://api.opendota.com/api/teams/${teamId}/matches`)
        .then((response) => response.json())
}
