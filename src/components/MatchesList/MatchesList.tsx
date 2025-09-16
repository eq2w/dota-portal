import './MatchesList.scss'
import { useQuery } from '@tanstack/react-query'
import { fetchRecentMatches, fetchRecentTeamMatches } from '../../api/Matches'
import { fetchHeroes } from '../../api/Hero'
import { useState } from 'react'
import { Link } from 'react-router'

interface TProps {
    type: 'player' | 'team',
    id: number,
}

const MatchesList = ({ type, id }: TProps) => {

    const matchesListQuery = useQuery({
        queryFn: () => fetchRecentMatches(id),
        queryKey: ['matches', id],
        retry: 0,
        enabled: type === 'player' && !!id,
    })
    const heroesQuery = useQuery({
        queryFn: () => fetchHeroes(),
        queryKey: ['heroes'],
        retry: 0,
        enabled: type === 'player' && !!id,
    })

    const matchesListTeamQuery = useQuery({
        queryFn: () => fetchRecentTeamMatches(id),
        queryKey: ['matches', id],
        retry: 0,
        enabled: type === 'team' && !!id,
    })


    const [visibleMatches, SetVisibleMatches] = useState(10)

    const handleLoadMoreMatches = () => {
        SetVisibleMatches(prev => prev + 10)
    }

    const recentPlayerMatchesList = matchesListQuery.data?.slice(0, visibleMatches)
    const recentTeamMatchesList = matchesListTeamQuery.data?.slice(0, visibleMatches)

    return (
        <div className="matches">
            <h2 className='matches__title'>Последние матчи</h2>
            {type === 'player' ?
                matchesListQuery.isLoading || heroesQuery.isLoading ?
                    (
                        <ul className='matches__list'>
                            {Array.from({ length: 10 }).map((_, i) => (
                                <li key={i} className='matches__item skeleton skeleton__item'>
                                </li>
                            ))}
                        </ul>
                    )
                    : matchesListQuery.isSuccess && heroesQuery.isSuccess && recentPlayerMatchesList?.length !== 0 ?
                        <ul className='matches__list'>
                            {recentPlayerMatchesList?.map((match) => (
                                <li key={match.match_id} className='matches__item'>
                                    <Link to={`/matches/${match.match_id}`} className="card-match">
                                        <span className='card-match__date'>Дата: {new Date(match.start_time * 1000).toLocaleString()}</span>
                                        <span className='card-match__hero'>Герой: {heroesQuery.data.find(hero => hero.id == match.hero_id)?.localized_name}</span>
                                        <div className="card-match__stats">
                                            <span className='card-match__stats-info'>K: {match.kills}</span>
                                            <span className='card-match__stats-info'>D: {match.deaths}</span>
                                            <span className='card-match__stats-info'>A: {match.assists} </span>
                                        </div>
                                        <div className="card-match__stats">
                                            <span className='card-match__stats-info'>GPM: {match.gold_per_min}</span>
                                            <span className='card-match__stats-info'>XPM: {match.xp_per_min}</span>
                                        </div>
                                        <span className='card-match__link'>Перейти к матчу</span>
                                    </Link>
                                </li>))}
                        </ul>
                        : matchesListQuery.isError ? <button className='btn matches__btn' onClick={() => matchesListQuery.refetch()}>Повторить запрос</button>
                            : <p className='matches__message'>Информация о матчах не найдена</p>
                : ''}
            {type === 'team' ?
                matchesListTeamQuery.isLoading ?
                    (
                        <ul className='matches__list'>
                            {Array.from({ length: 10 }).map((_, i) => (
                                <li key={i} className='matches__item skeleton skeleton__item'>
                                </li>
                            ))}
                        </ul>
                    )
                    : matchesListTeamQuery.isSuccess && !!recentTeamMatchesList ?
                        <ul className='matches__list'>
                            {recentTeamMatchesList?.map((match) => (
                                <li key={match.match_id} className='matches-item'>
                                    <Link to={`/matches/${match.match_id}`} className={`card-match card-match--team ${match.radiant === match.radiant_win ? '' : 'card-match--lose'}`}>
                                        <span className='card-match__result'>{match.radiant === match.radiant_win ? 'Победа' : 'Поражение'}</span>
                                        <span className='card-match__date'>Дата: {new Date(match.start_time * 1000).toLocaleString()}</span>
                                        <span className='card-match__text'>VS</span>
                                        {match.opposing_team_logo ?
                                            <img className='card-match__image' src={match.opposing_team_logo} onError={(e) => e.currentTarget.src = '/images/stub.jpg'} alt='Аватар команды' />
                                            : <img className='card-match__image' src='/images/stub.jpg' alt="Аватар профиля" />}
                                        {match.opposing_team_name ?
                                            <span className='card-match__team'>{match.opposing_team_name}</span>
                                            : <span className='card-match__team'>{'Unknown'}</span>}
                                        <span className='card-match__link'>Перейти к матчу</span>
                                    </Link>
                                </li>))}
                        </ul>
                        : matchesListTeamQuery.isError ? <button className='btn matches__btn' onClick={() => matchesListQuery.refetch()}>Повторить запрос</button>
                            : <p className='matches__message'>Информация о матчах не найдена</p>
                : ''}
            {
                matchesListQuery.isSuccess ?
                    <button className={`btn matches__btn ${visibleMatches >= matchesListQuery.data?.length ? 'visually-hidden' : ''}`} onClick={handleLoadMoreMatches}>Загрузить ещё</button> : ''
            }
        </div >
    )
}

export default MatchesList