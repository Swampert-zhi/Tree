import React from 'react';
import {Route, Redirect} from 'react-router-dom';

class CheckRoute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false,
            ready: false,
        }
    }

    componentDidMount() {
        let id = localStorage.getItem("userId");
        if (id != null) {
            this.setState({login: true});

        }
        this.setState({ready:true});
    }

    render() {
        const {component: Component, path="/",exact=false,strict=false} = this.props;

        if(!this.state.ready)
            return null;

        return <Route path={path} exact={exact} strict={strict} render={props => (
            this.state.login ? (
                <Component {...props}/>
            ) : (
                <Redirect to={{
                    pathname: '/Login',
                    state: {from: props.location}
                }}/>
            )
        )}/>
    }
}


export default CheckRoute;
