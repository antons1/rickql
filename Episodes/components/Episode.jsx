import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link, useParams } from 'react-router-dom';

const EPISODE = gql`
    query Episode($id: ID!){
        episode(id: $id) {
            name
            air_date
            episode
            characters {
                id
                name
                status
                species
            }
        }
    }
`;

export const Episode = () => {
    const { id } = useParams();
    const { data, loading, error } = useQuery(EPISODE, { variables: { id } });
    return (
        <div>
            {loading && "Laster..."}
            {error && "Det oppstod en feil"}
            {data &&
                <div>
                    {data.episode.episode} - {data.episode.name} - {data.episode.air_date}
                    <h3>Characters</h3>
                    <ul>
                        {data.episode.characters.map(({ id, name, status, species }, idx) =>
                            <li key={idx}>
                                <Link to={`/characters/${id}`}><strong>{name}</strong> ({species})</Link>: {status}
                            </li>)}
                    </ul>
                </div>}
        </div>
    )
}