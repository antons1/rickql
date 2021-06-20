import React from 'react';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider
} from "@apollo/client";
import { HashRouter as Router, Switch, Route, Link, useParams } from 'react-router-dom';

import { Episodes } from './components/Episodes';
import { Episode } from './components/Episode';
const Character = React.lazy(() => import("characters/Character"))

const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache: new InMemoryCache()
});

const CharacterWithId = () => {
    const { id } = useParams();
    return <Character id={id} />
}

export const App = () => {
    return (
        <ApolloProvider client={client}>
            <Router>
                <Link to="/">Home</Link><br />
                <br />
                <Switch>
                    <Route path="/characters/:id">
                        <React.Suspense fallback={"Laster komponent..."}><CharacterWithId /></React.Suspense>
                    </Route>
                    <Route path="/episodes/:id" component={Episode} />
                    <Route path="/episodes" component={Episodes} />
                    <Route exact path="/" component={Episodes} />
                </Switch>
            </Router>
        </ApolloProvider>
    )
}