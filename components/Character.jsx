import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import { useParams } from 'react-router';

const CHARACTER = gql`
query($id: ID!) {
    character(id: $id) {
        name
        status
        species
        gender
        image
    }
}`

export const Character = () => {
    const { id } = useParams();
    const { data, loading, error } = useQuery(CHARACTER, { variables: { id } });

    return (
        <div>
            {loading && "Laster..."}
            {error && "Det oppstod en feil"}
            {data && <div>
                <h1>{data.character.name}</h1>
                {data.character.status} - {data.character.species} - {data.character.gender}<br />
                <br />
                <img src={data.character.image} />
            </div>}
        </div>
    )
}