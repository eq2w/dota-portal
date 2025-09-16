import { useParams } from 'react-router'
import './PlayerPage.scss'
import { useQuery } from '@tanstack/react-query'
import { fetchPlayerId } from '../../api/Players'
import IconSteam from '../../assets/icons/icon-steam.svg'
import SvgIcon from '../../ui/Svg/Svg'

import MatchesList from '../../components/MatchesList/MatchesList'

const PlayerPage = () => {
    const { playerId } = useParams()

    const playerIdQuery = useQuery({
        queryFn: () => fetchPlayerId(Number(playerId)),
        queryKey: ['player', Number(playerId)],
        retry: 0,
    })

    return (
        <section className='player'>
            <div className="container">
                <div className="player__wrapper">
                    <h1 className="player__title">Информация о пользователе</h1>
                    <div className="player__inner">
                        {playerIdQuery.isLoading ?
                            <>
                                <div className='player__avatar skeleton skeleton__square'></div>
                                <div className="player__info">
                                    <p className='player__nickname skeleton skeleton__text'></p>
                                    <p className='player__rating skeleton skeleton__text'></p>
                                    <p className='player__team skeleton skeleton__text'></p>
                                    <p className="player__link skeleton skeleton__text"></p>
                                </div>
                            </> :
                            playerIdQuery.isSuccess ?
                                playerIdQuery.data?.profile && !!playerId?
                                    (<>
                                        {playerIdQuery.data.profile.avatarfull ?
                                            <img src={playerIdQuery.data.profile.avatarfull} alt="Аватар профиля" className="player__avatar" />
                                            :
                                            <img className='player__avatar' src='/images/stub.jpg' width={184} height={184} alt="Аватар профиля" />
                                        }
                                        <div className="player__info">
                                            <p className='player__nickname'>Никнейм: {playerIdQuery.data.profile.personaname}</p>
                                            <p className='player__rating'>MMR: {playerIdQuery.data.computed_rating ? playerIdQuery.data.computed_rating.toFixed() : '-'}</p>
                                            <p className="player__team">Команда: {playerIdQuery.data.profile.team_name ? playerIdQuery.data.profile.team_name : '-'} </p>
                                            <a href={playerIdQuery.data.profile.profileurl} className="player__link" target='_blank' rel="noopener noreferrer">
                                                Профиль в Steam <SvgIcon icon={IconSteam} width={22} height={22} />
                                            </a>
                                        </div>
                                    </>)
                                    : <p className='player__message'>Информация о пользователе не найдена</p>
                                : <button className='btn player__btn' onClick={() => playerIdQuery.refetch()}>Повторить запрос</button>
                        }
                    </div>
                </div>
                <MatchesList type='player' id={Number(playerId)} />
            </div>
        </section >
    )

}


export default PlayerPage