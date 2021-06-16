import React from 'react';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider
} from "@apollo/client";
import { HashRouter as Router, Switch, Route} from 'react-router-dom';

import { Episodes } from './components/Episodes';
import { Episode } from './components/Episode';
import { Character } from './components/Character';

const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache: new InMemoryCache()
});

export const App = () => {
    return (
        <ApolloProvider client={client}>
            <Router>
                <Switch>
                    <Route path="/characters/:id" component={Character} />
                    <Route path="/episodes/:id" component={Episode}/>
                    <Route path="/episodes" component={Episodes} />
                    <Route exact path="/" component={Episodes} />
                </Switch>
            </Router>
        </ApolloProvider>
    )
}