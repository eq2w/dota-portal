import { Link, useParams } from 'react-router'
import './MatchPage.scss'
import { useQuery } from '@tanstack/react-query'
import { fetchMatchId } from '../../api/Matches'
import { fetchHeroes } from '../../api/Hero'


const MatchPage = () => {
    const { matchId } = useParams()

    const matchIdQuery = useQuery({
        queryFn: () => fetchMatchId(Number(matchId)),
        queryKey: ['match', matchId],
        retry: 0,
    })

    const heroesQuery = useQuery({
        queryFn: () => fetchHeroes(),
        queryKey: ['heroes'],
        retry: 0,
    })

    if (matchIdQuery.status === 'success' && heroesQuery.status === 'success') {
        return (
            <section className='match-info'>
                <div className="container">
                    <div className="match-info__wrapper">
                        <h1 className='match-info__title'>Информация о матче {matchId}</h1>
                        <h2 className={matchIdQuery.data.radiant_win ? 'match-info__result' : 'match-info__result match-info__result--dire'}>
                            {matchIdQuery.data.radiant_win ? 'Победа сил света' : 'Победа сил тьмы'}
                        </h2>
                        <p className='match-info__result-point'>{matchIdQuery.data.radiant_score} : {matchIdQuery.data.dire_score}</p>
                        <div className="match-info__inner">
                            <div className="match-info__team">
                                <h3 className='match-info__team-title'>Силы света</h3>
                                <ul className="match-info__players-list">
                                    {matchIdQuery.data.players.map((player) =>
                                        player.isRadiant &&
                                        <li className='match-info__players-item' key={player.player_slot}>
                                            <Link to={`/players/${player.account_id}`} className="match-info__player">
                                                <p className='match-info__player-name'>{player.personaname ? player.personaname : '{Unknown}'}</p>
                                                <p className='match-info__player-hero'>Герой: {heroesQuery.data?.find(hero => hero.id === player.hero_id)?.localized_name}</p>
                                                <div className="match-info__player-stats">
                                                    <span className='match-info__player-stats-info'>K: {player.kills}</span>
                                                    <span className='match-info__player-stats-info'>D: {player.deaths}</span>
                                                    <span className='match-info__player-stats-info'>A: {player.assists}</span>
                                                </div>
                                                <div className="match-info__player-stats">
                                                    <span className='match-info__player-stats-info'>GPM: {player.gold_per_min}</span>
                                                    <span className='match-info__player-stats-info'>XPM: {player.xp_per_min}</span>
                                                </div>
                                            </Link>
                                        </li>)}
                                </ul>
                            </div>
                            <div className="match-info__team match-info__team--right">
                                <h3 className='match-info__team-title'>Силы тьмы</h3>
                                <ul className="match-info__players-list">
                                    {matchIdQuery.data.players.map((player) =>
                                        !player.isRadiant &&
                                        <li className='match-info__players-item' key={player.player_slot}>
                                            <Link to={`/players/${player.account_id}`} className="match-info__player">
                                                <p className='match-info__player-name'>{player.personaname ? player.personaname : '{Unknown}'}</p>
                                                <p className='match-info__player-hero'>Герой: {heroesQuery.data?.find(hero => hero.id === player.hero_id)?.localized_name}</p>
                                                <div className="match-info__player-stats">
                                                    <span className='match-info__player-stats-info'>K: {player.kills}</span>
                                                    <span className='match-info__player-stats-info'>D: {player.deaths}</span>
                                                    <span className='match-info__player-stats-info'>A: {player.assists}</span>
                                                </div>
                                                <div className="match-info__player-stats">
                                                    <span className='match-info__player-stats-info'>GPM: {player.gold_per_min}</span>
                                                    <span className='match-info__player-stats-info'>XPM: {player.xp_per_min}</span>
                                                </div>
                                            </Link>
                                        </li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default MatchPage