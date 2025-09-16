import FetchTopPlayersList from '../../components/CardsList/FetchTopPlayersList'
import './TopPlayersPage.scss'

const TopPlayersPage = () => {

    return (
        <section className='top-players'>
            <div className="container">
                <div className="top-players__wrapper">
                    <h1 className="top-players__title">ТОП-100 игроков</h1>
                    <FetchTopPlayersList />
                </div>
            </div>
        </section>
    )
}

export default TopPlayersPage