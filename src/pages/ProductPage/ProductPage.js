import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {ProductDetails, ProductRegistration} from "./ProductLayout";
import {ProductList} from "./ProductList";


export const ProductPage = () => {
    return (
        <Switch>
            <Route path={"/products/add"} exact strict children={<ProductRegistration/>}/>
            <Route path={"/products/:id"} exact strict children={<ProductDetails/>}/>
            <Route path={"/products"} exact children={<ProductList/>}/>
            <Route path={"*"}>
                <Redirect to={"/not-found"}/>
            </Route>
        </Switch>
    );
};