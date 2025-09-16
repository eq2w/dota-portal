import FetchProList from '../../components/CardsList/FetchProPlayersList'
import './ProPlayersPage.scss'

const ProPlayersPage = () => {

    return (
        <section className='pro-players'>
            <div className="container">
                <div className="pro-players__wrapper">
                    <h1 className="pro-players__title">PRO игроки</h1>
                    <FetchProList />
                </div>
            </div>
        </section>
    )
}

export default ProPlayersPage