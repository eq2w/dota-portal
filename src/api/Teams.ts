
export interface Team {
    team_id: number,
    rating: number,
    wins: number,
    losses: number,
    last_match_time: number,
    name: string,
    tag: string,
    logo_url: string,
}

export type Teams = Team[]

export function fetchProTeams(): Promise<Teams> {
    return fetch("https://api.opendota.com/api/teams")
        .then((response) => response.json())
}

export function fetchTeamId(id: number): Promise<Team> {
    return fetch(`https://api.opendota.com/api/teams/${id}`)
        .then((response) => response.json())
}