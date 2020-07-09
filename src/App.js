import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Editor from './editor';
export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/editor">
                    <Editor />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

function Home() {
    return <div>
        <h2>Welcome Monaco-editor</h2>
        <Link to='/editor'>editor demo</Link>
    </div>;
}