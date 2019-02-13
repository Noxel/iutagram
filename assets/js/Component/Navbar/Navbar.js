import React, {Component} from 'react';
import Logo from "./Logo";
import Search from "./Search";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Connexion from "./Connexion";

export default class Navbar extends Component {
    render() {
        return (
                <AppBar position="static" color={"default"}>
                    <Toolbar>
                        <Logo/>
                        <Search/>
                        <Connexion/>
                    </Toolbar>
                </AppBar>
        )
    }
}