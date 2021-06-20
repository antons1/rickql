import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

const EPISODES = gql`
query {
    episodes {
        results {
            name
            air_date
            episode
            id
        }
    }
}
`

export const Episodes = () => {
    const { loading, error, data } = useQuery(EPISODES);
    return (
        <div>
            <h1>Episoder</h1>
            <div>
            {loading && "Laster..."}
            {error && <span>Det skjedde en feil: <pre>{JSON.stringify(error, null, 2)}</pre></span>}
            {data && <ul>{data.episodes.results.map((episode, idx) => <Episode {...episode} key={idx} />)}</ul>}
            </div>
        </div>
    )
}

const Episode = ({ name, air_date, episode, id }) =>
    <li>
        {episode} - <Link to={`/episodes/${id}`}>{name}</Link>
    </li>;