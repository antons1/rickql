import React from 'react';
import {
    useQuery,
    gql
} from '@apollo/client';

const EPISODES = gql`
query {
    episodes {
        results {
            name
            air_date
            episode
        }
    }
}
`

export const App = () => {
    const { loading, error, data } = useQuery(EPISODES);
    return (
        <div>
            <h1>Episoder</h1>
            <div>
            {loading && "Laster..."}
            {error && <span>Det skjedde en feil: <pre>{JSON.stringify(error, null, 2)}</pre></span>}
            {!loading && !error && data && <ul>{data.episodes.results.map(({ name, air_date, episode }, idx) => <li key={idx}>{name} - {episode} - {air_date}</li>)}</ul>}
            </div>
        </div>
    )
}