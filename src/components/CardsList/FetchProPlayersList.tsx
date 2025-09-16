import { useQuery } from "@tanstack/react-query"
import { fetchProPlayers } from "../../api/Players"
import CardsList from "./CardsList"


const FetchProList = () => {

    const proPlayersQuery = useQuery({
        queryFn: () => fetchProPlayers(),
        queryKey: ['proPlayers'],
        retry: 0,
    })

    switch (proPlayersQuery.status) {
        case 'error':
            return <button className='btn cards__btn' onClick={() => proPlayersQuery.refetch()}>Повторить запрос</button>
        case 'pending':
            return <CardsList players={[]} page="pro" type="players" />
        case 'success':
            return <CardsList players={proPlayersQuery.data} type="players" page="pro" />
    }
}

export default FetchProList