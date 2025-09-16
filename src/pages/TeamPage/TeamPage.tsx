import './TeamPage.scss'
import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { fetchTeamId } from '../../api/Teams'
import MatchesList from '../../components/MatchesList/MatchesList'

const TeamPage = () => {
    const { teamId } = useParams()

    const teamIdQuery = useQuery({
        queryFn: () => fetchTeamId(Number(teamId)),
        queryKey: ['team', teamId],
        retry: 0,
        enabled: !!teamId
    })

    return (
        <section className='team'>
            <div className="container">
                <div className="team__wrapper">
                    <h1 className="team__title">Информация о команде</h1>
                    <div className="team__inner">
                        {teamIdQuery.isLoading ?
                            <>
                                <div className='team__avatar skeleton skeleton__rectangle'></div>
                                <div className="team__info">
                                    <p className='team__name skeleton skeleton__text'></p>
                                    <p className='team__tag skeleton skeleton__text'></p>
                                    <p className='team__tag skeleton skeleton__text'></p>
                                    <p className='team__tag skeleton skeleton__text'></p>
                                </div>
                            </> :
                            teamIdQuery.isSuccess ?
                                <>
                                    {
                                        teamIdQuery.data?.logo_url ?
                                            <img src={teamIdQuery.data?.logo_url} onError={(e) => e.currentTarget.src = '/images/stub.jpg'} alt="Аватар профиля" className="team__avatar" />
                                            :
                                            <img className='team__avatar' src='/images/stub.jpg' width={184} height={184} alt="Аватар профиля" />
                                    }
                                    < div className="team__info">
                                        <p className='team__name'>Название: {teamIdQuery.data?.name}</p>
                                        <p className='team__tag'>Тег: {teamIdQuery.data?.tag}</p>
                                        <p className='team__tag'>Побед: {teamIdQuery.data?.wins}</p>
                                        <p className='team__tag'>Поражений: {teamIdQuery.data?.losses}</p>
                                    </div>
                                </>
                                : teamIdQuery.isError ?
                                    <button className='btn team__btn' onClick={() => teamIdQuery.refetch()}>Повторить запрос</button>
                                    : <p className='team__message'>Информация о команде не найдена</p>
                        }
                    </div>
                </div>
                <MatchesList type={'team'} id={Number(teamId)} />
            </div>
        </section >
    )
}

export default TeamPage