import React from 'react';
import useAuth from '../../Hooks/useAuth';
import Krovimas from '../Krovimas/Krovimas';
import { Route, Redirect } from 'react-router-dom';


const Meistras = ({ children, ...rest }) => {
    // panaudoja useAuth() funkcija 
    const { user, isAdmin, isMeistras, isLoading } = useAuth();
    // defaultinis krovimas kol neuzkrove
    if (isLoading) { return <Krovimas /> }
    return (
        // returnina admin route
        <Route
            {...rest}
            render={({ location }) =>
                user.email && isMeistras ? (
                    children
                ) : (
                    //redirectina
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default Meistras;