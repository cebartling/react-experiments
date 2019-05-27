import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Switch} from "react-router";
import SignUpForm from "./views/SignUpForm";
import Home from "./views/Home";
import Profile from "./views/Profile";
import Header from "./components/Header";

function App() {
    return (
        <div className="d-flex flex-column h-100">
            <Router>
                <Header/>
                <main role="main" className="flex-shrink-0">
                    <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/profile" component={Profile}/>
                        <Route path="/signUp" component={SignUpForm}/>
                    </Switch>
                </main>
            </Router>
        </div>
    );
}

export default App;
