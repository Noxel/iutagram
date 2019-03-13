import React, {Component} from 'react';
import Navbar from "./Navbar/Navbar";
import Profile from "./Body/Profile";
import FormConnexion from "./FormConnexion";
import Actuality from "./Body/Actuality";

export default class Application extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <Actuality/>
                <FormConnexion/>
            </div>)
    }
}