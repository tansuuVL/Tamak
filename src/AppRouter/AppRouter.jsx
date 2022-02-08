import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router'
import { adminRoutes, privateRoutes, publicRoutes } from './routes'

const Approuter = () => {
    const isAuth = useSelector(state => state.auth.isAuth)

    const isAdmin = useSelector(state => state.auth.isAdmin)

    if(isAdmin) {
        return (
            <Switch>
                {
                    adminRoutes.map(route =>
                        <Route 
                            exact={route.exact}
                            component={route.component}
                            path={route.path}
                        />    
                    )
                }
            </Switch>
        )
    }

    return (
       isAuth ?
            <Switch>
                {
                    privateRoutes.map(route =>
                        <Route
                            exact={route.exact}
                            path={route.path}
                            component={route.component}
                        />
                    )
                }
                <Redirect to="/main"/>
            </Switch>
       :

            <Switch>
                {
                    publicRoutes.map(route =>
                        <Route 
                            exact={route.exact}
                            path={route.path}
                            component={route.component}
                        />
                    )
                }
                <Redirect to="/main"/>
            </Switch>
    )
}

export default Approuter
