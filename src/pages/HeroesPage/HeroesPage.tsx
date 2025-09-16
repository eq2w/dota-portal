import { useQuery } from '@tanstack/react-query'
import './HeroesPage.scss'
import { fetchHeroes } from '../../api/Hero'
import { Link } from 'react-router'
import { useState } from 'react'


const HeroesPage = () => {

    const heroesQuery = useQuery({
        queryFn: () => fetchHeroes(),
        queryKey: ['heroes'],
        retry: 0,
    })

    const [searchByName, setSearchByName] = useState('')
    const [searchByAttack, setSearchByAttack] = useState<string[]>([])

    const handleSearchByName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchByName(e.target.value)
    }

    const handleSearchByAttack = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target
        setSearchByAttack((prev) =>
            checked ? [...prev, value] : prev.filter((item) => item !== value)
        );
    }


    return (
        <section className='heroes'>
            <div className="container">
                <div className="heroes__wrapper">
                    <h1 className='heroes__title'>Герои</h1>
                    <div className="heroes__filter">
                        <input className='heroes__search' name='search' onChange={handleSearchByName} value={searchByName ? searchByName : ''} placeholder='Поиск героя по имени' type='text' />
                        <div className="custom-checkbox">
                            <input className='custom-checkbox__field visually-hidden' onChange={handleSearchByAttack} type='checkbox' id='ranged' name='ranged' value={'ranged'} />
                            <label className='custom-checkbox__label' htmlFor='ranged'>
                                <span className='custom-checkbox__text'>Дальний бой</span>
                            </label>
                        </div>
                        <div className="custom-checkbox">
                            <input className='custom-checkbox__field visually-hidden' onChange={handleSearchByAttack} type='checkbox' id='melee' name='melee' value={'melee'} />
                            <label className='custom-checkbox__label' htmlFor='melee'>
                                <span className='custom-checkbox__text'>Ближний бой</span>
                            </label>
                        </div>
                    </div>

                    {heroesQuery.isLoading ?
                        <ul className='heroes__list'>
                            {Array.from({ length: 126 }).map((_, i) => (
                                <li key={i} className='player__matches-item skeleton skeleton__item skeleton__item--heroes'>
                                </li>))}
                        </ul> :
                        heroesQuery.isSuccess ?
                            <ul className='heroes__list'>
                                {heroesQuery.data?.filter((hero) => hero.localized_name.toLowerCase().includes(searchByName.toLowerCase())).filter((hero) => searchByAttack.length > 0 ? searchByAttack.includes(hero.attack_type.toLowerCase()) : hero).map((hero) => (
                                    <li className='heroes__item' key={hero.id}>
                                        <Link className='heroes__card' to={`/heroes/${hero.name.replace('npc_dota_hero_', '')}`}>
                                            <img className='heroes__image' fetchPriority="high" loading='lazy' src={`../images/icons-heroes/${hero.name.replace('npc_dota_hero_', '')}.png`} alt="Изображение героя" />
                                            <span className='heroes__name'>{hero.localized_name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            : <button className='btn heroes__btn' onClick={() => { heroesQuery.refetch() }}>Повторить запрос</button>
                    }
                </div>
            </div>
        </section>
    )
}

export default HeroesPage