import React from 'react';
import useAuth from '../../Hooks/useAuth';
import { Route, Redirect } from 'react-router-dom';
import Krovimas from '../Krovimas/Krovimas';

const PrivateRoute = ({ children, ...rest }) => {
    const { user, isLoading } = useAuth();
    if (isLoading) {
        return (
            <Krovimas />
        );
    };
//redirectina i prisijungima
    return (
        <Route
            {...rest}
            render={({ location }) => user.email ? children : <Redirect
                to={{
                    pathname: "/Prisijungimas",
                    state: { from: location }
                }}
            ></Redirect>}
        >

        </Route>
    );
};

export default PrivateRoute;