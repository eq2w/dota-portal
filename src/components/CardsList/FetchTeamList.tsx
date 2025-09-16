import { useQuery } from "@tanstack/react-query"
import CardsList from "./CardsList"
import { fetchProTeams } from "../../api/Teams"


const FetchTeamList = () => {

    const teamsListQuery = useQuery({
        queryFn: () => fetchProTeams(),
        queryKey: ['proTeams'],
        retry: 0,
    })

    switch (teamsListQuery.status) {
        case 'error':
            return <button className='btn cards__btn' onClick={() => teamsListQuery.refetch()}>Повторить запрос</button>
        case 'pending':
            return <CardsList type="teams" teams={[]} />
        case 'success':
            return <CardsList type="teams" teams={teamsListQuery.data} />
    }
}

export default FetchTeamList