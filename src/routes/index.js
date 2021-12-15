import {Switch} from 'react-router-dom'
import Route from './Route'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'

import Dashboard from '../pages/Dashboard/dashboard'
import Profile from '../pages/Profile/profile'
import Customers from '../pages/Customers/Customers'
import New from '../pages/New/new'

export default function Routes(){
    return(
        <Switch>
            <Route exact path="/" component={SignIn}/>
            <Route exact path="/register" component={SignUp}/>

            <Route exact path="/dashboard" component={Dashboard} IsPrivate/>
            <Route exact path="/customers" component={Customers} IsPrivate/>
            <Route exact path="/profile"   component={Profile}   IsPrivate/>
            <Route exact path="/new"       component={New}       IsPrivate/>
        </Switch>
    )
}