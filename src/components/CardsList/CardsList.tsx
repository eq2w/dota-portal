import { Link, useSearchParams } from 'react-router'
import type { Players } from '../../api/Players'
import './CardsList.scss'
import { useEffect, useState } from 'react'
import type { Teams } from '../../api/Teams'

interface TProps {
    players?: Players,
    type: 'players' | 'teams',
    teams?: Teams,
    page?: 'top' | 'pro',
}

const PlayerList = ({ players, type, page, teams }: TProps) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [visibleCards, setVisibleCards] = useState(10)


    const handleLoadMoreCards = () => {
        const newCount = visibleCards + 10;
        setVisibleCards(newCount);
        setSearchParams({ count: newCount.toString() });
    }

    const playersList = players?.slice(0, visibleCards)
    const teamsList = teams?.slice(0, visibleCards)

    useEffect(() => {
        const paramValue = parseInt(searchParams.get("count") || "10", 10);
        if (paramValue !== visibleCards) {
            setVisibleCards(paramValue);
        }
    }, [searchParams]);
    return (
        <>
            {type === 'players' ?
                !players?.length ?
                    <ul className='cards__list'>
                        <>
                            {Array.from({ length: visibleCards }).map((_, i) => (
                                <li key={i} className={`cards__item skeleton skeleton__item skeleton__item--players`}>
                                </li>))}
                        </>
                    </ul>
                    :
                    <>
                        <ul className='cards__list'>
                            {
                                playersList?.map((player) => (
                                    <li className={`cards__item ${page === 'top' ? 'cards__item--top' : ''}`} key={player.account_id}>
                                        <Link className='card' to={`/players/${player.account_id}`}>
                                            {player.avatarfull ?
                                                <img className='card__avatar' src={player.avatarfull} onError={(e) => e.currentTarget.src = '/images/stub.jpg'} alt="Аватар профиля" /> :
                                                <img className='card__avatar card__avatar--no-avatar' src='/images/stub.jpg' width={184} height={184} alt="Аватар профиля" />
                                            }
                                            <p className='card__name'>{player.personaname ? player.personaname : '{Unknown}'}</p>
                                            {page === 'top' ? <p className='card__rating'>MMR: {player.computed_mmr.toFixed(0)}</p> :
                                                <p className='card__team'>Team: {player.team_name}</p>
                                            }
                                        </Link>
                                    </li>
                                ))

                            }
                        </ul>
                        <button className={`btn cards__btn ${visibleCards >= players.length ? 'visually-hidden' : ''}`} onClick={handleLoadMoreCards}>Загрузить ещё</button>
                    </>
                : !teams?.length ?
                    <ul className='cards__list'>
                        <>
                            {Array.from({ length: visibleCards }).map((_, i) => (
                                <li key={i} className={`cards__item skeleton skeleton__item skeleton__item--players`}>
                                </li>))}
                        </>
                    </ul> :
                    <>
                        <ul className='cards__list'>
                            {
                                teamsList?.map((team) => (
                                    <li className={`cards__item ${page === 'top' ? 'cards__item--top' : ''}`} key={team.team_id}>
                                        <Link className='card' to={`/teams/${team.team_id}`}>
                                            {team.logo_url ?
                                                <img className='card__avatar card__avatar--team' src={team.logo_url} onError={(e) => e.currentTarget.src = '/images/stub.jpg'} alt="Аватар профиля" /> :
                                                <img className='card__avatar card__avatar--team card__avatar--no-avatar' src='/images/stub.jpg' width={184} height={184} alt="Аватар профиля" />
                                            }
                                            <p className='card__name'>{team.name ? team.name : '{Unknown}'}</p>
                                        </Link>
                                    </li>
                                ))

                            }
                        </ul>
                        <button className={`btn cards__btn ${visibleCards >= teams?.length ? 'visually-hidden' : ''}`} onClick={handleLoadMoreCards}>Загрузить ещё</button>
                    </>
            }

        </>)
}
export default PlayerList