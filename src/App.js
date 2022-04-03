import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga';
import NotFound from './components/NotFound';
import OneRepo from './components/OneRepo';
import RepoList from './components/RepoList';


const App = () => {
    useEffect(() => {
        ReactGA.initialize('G-8S1GH91TK2');
        // to report pae view
        ReactGA.pageview(window.location.pathname+window.location.search);
    }, [])
    
    return(
        <Router>
            <div className='App'></div>
            <Switch>
                <Route exact path="/users/:username/repos"  component={RepoList}/>
                <Route exact path="/users/:username/repos/:repo" component={OneRepo}/>
                <Route path="*">
                    <NotFound text='Route not found!'/>
                    {console.log(window.location.pathname)}
                </Route>
            </Switch>
        </Router>
    );
}
export default App;