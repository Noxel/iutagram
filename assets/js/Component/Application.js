import React, {Component} from 'react';
import Navbar from "./Navbar/Navbar";
import Profile from "./Body/Profile";
import FormConnexion from "./FormConnexion";

export default class Application extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <Profile/>
                <FormConnexion/>
            </div>)
    }
}