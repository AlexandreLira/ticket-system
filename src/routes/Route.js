import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../contexts/auth';
export default function RouteWrapper({
    component: Component,
    IsPrivate,
    ...rest
}){

    const {signed, loading} = useContext(AuthContext)

    if(loading){
        return(
            <div></div>
        )
    }
    
    if(!signed && IsPrivate){
        return <Redirect to="/"/>
    }

    if(signed && !IsPrivate){
        return <Redirect to="/dashboard"/>
    }

    return(
        <Route
            {...rest}
            render={ props => (
                <Component {...props} />
            )}
        />
    )
}