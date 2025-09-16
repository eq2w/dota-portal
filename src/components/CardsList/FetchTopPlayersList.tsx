import { useQuery } from "@tanstack/react-query"
import { fetchTopPlayers } from "../../api/Players"
import CardsList from "./CardsList"


const FetchTopList = () => {

    const topPlayersQuery = useQuery({
        queryFn: () => fetchTopPlayers(),
        queryKey: ['topPlayers'],
        retry: 0,
    })



    switch (topPlayersQuery.status) {
        case 'error':
            return <button className='btn cards__btn' onClick={() => topPlayersQuery.refetch()}>Повторить запрос</button>
        case 'pending':
            return <CardsList players={[]} page="top" type="players" />
        case 'success':
            return <CardsList players={topPlayersQuery.data} page="top" type="players" />
    }
}

export default FetchTopList