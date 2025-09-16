import { useParams } from 'react-router'
import './HeroPage.scss'
import { useQuery } from '@tanstack/react-query'
import { fetchHeroes, fetchHeroesAbilities, type Hero } from '../../api/Hero'


const HeroPage = () => {
    const { heroId } = useParams()


    const heroesQuery = useQuery({
        queryFn: () => fetchHeroes(),
        queryKey: ['heroes'],
        retry: 0,
    })

    const abilitiesQuery = useQuery({
        queryFn: () => fetchHeroesAbilities(),
        queryKey: [heroId, 'abilities'],
        retry: 0,
    })




    let hero: Hero | undefined

    if (heroesQuery.isSuccess && abilitiesQuery.isSuccess) {
        hero = heroesQuery.data?.find((hero) => hero.name.includes(`npc_dota_hero_${heroId}`));
    }
    return (
        <section className='hero'>
            <div className="container">
                <div className="hero__wrapper">
                    <div className="hero__title">Информация о герое</div>
                    <div className="hero__inner">
                        {heroesQuery.isLoading || abilitiesQuery.isLoading ?
                            <>
                                <div className='hero__avatar skeleton skeleton__rectangle'></div>
                                <div className="hero__info">
                                    <p className='hero__name skeleton skeleton__text'></p>
                                    <p className='hero__attack skeleton skeleton__text'></p>
                                    <p className='hero__roles skeleton skeleton__text'></p>
                                    <p className='hero__abilities-text skeleton skeleton__text'></p>
                                    <ul className='hero__abilities-list'>
                                        {Array.from({ length: 4 }).map((_, i) => (
                                            <li className='hero__abilities-item' key={i}>
                                                <p className='hero__abilities-ability skeleton skeleton__text'></p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                            :
                            heroesQuery.isSuccess && abilitiesQuery.isSuccess ?
                                hero !== undefined ?
                                    (<>
                                        <img className='hero__avatar' src={`/images/icons-heroes/${hero?.name.replace('npc_dota_hero_', '')}.png`} width={184} height={184} alt="Аватар профиля" />
                                        <div className="hero__info">
                                            <p className='hero__name'>Имя: {hero?.localized_name}</p>
                                            <p className='hero__attack'>Тип атаки: {hero?.attack_type}</p>
                                            <p className='hero__roles'>Роли: {hero?.roles.map((role, id) => id !== hero.roles.length - 1 ? `${role}, ` : role)}</p>
                                            <p className='hero__abilities-text'>Способности:</p>
                                            <ul className='hero__abilities-list'>
                                                {abilitiesQuery.data[hero?.name].abilities.map((ability, i) => (
                                                    ability !== 'generic_hidden' ?
                                                        <li className='hero__abilities-item' key={i}>
                                                            <p className='hero__abilities-ability'>{ability.replace(`${hero.name.replace('npc_dota_hero_', '')}_`, '').replace(/_/g, ' ').toUpperCase()}</p>
                                                        </li> : ''
                                                ))}
                                            </ul>
                                        </div>
                                    </>)
                                    : <p className='hero__message'>Информация о герое не найдена</p>
                                : <button className='btn hero__btn' onClick={() => { heroesQuery.refetch(), abilitiesQuery.refetch() }}>Повторить запрос</button>
                        }

                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroPage