import React, {Component} from 'react';
import { connect } from 'react-redux';
import Navbar from "./Navbar/Navbar";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Profile from "./Body/Profile";
import FormConnexion from "./FormConnexion";
import Actuality from "./Body/Actuality";
import Index from "./Body/Index"



class Application extends Component {
    screenIndex(){return this.props.auth?<Actuality/> :<Index/>};
    screenProfile({match}){return <Profile id={match.params.id}/>};
    screenActuality(){return this.props.auth?<Actuality/>:<Index/>};

    render() {
        return (
            <Router>
            <div>
                <Navbar/>
                    <Route path="/" exact component={this.screenIndex.bind(this)} />
                    <Route path="/profile/:id" component={this.screenProfile.bind(this)} />
                    <Route path="/actuality/" component={this.screenActuality.bind(this)} />
                <FormConnexion/>
            </div>
            </Router>)
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Application)