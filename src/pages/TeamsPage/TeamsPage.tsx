import './TeamsPage.scss'
import FetchTeamList from '../../components/CardsList/FetchTeamList'

const TeamsPage = () => {

    return (
        <section className='teams'>
            <div className="container">
                <div className="teams__wrapper">
                    <h1 className='teams__title'>PRO Команды</h1>
                    <FetchTeamList />
                </div>
            </div>
        </section>
    )

}
export default TeamsPage