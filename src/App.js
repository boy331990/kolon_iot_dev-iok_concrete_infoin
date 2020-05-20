import React from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import {HomePage, NotFoundPage, SignInPage} from "./pages";
import {PrivateRoute} from "./components/molecules";


const App = () => {
    return (
        <Switch>
            <Route path={"/login"} exact strict children={<SignInPage/>}/>
            <Route path={"/not-found"} exact strict children={<NotFoundPage/>}/>
            <PrivateRoute path={"/"}>
                <HomePage/>
            </PrivateRoute>
        </Switch>
    );
};

export default App;