import React, {Component} from 'react';
import Logo from "./Logo";
import Search from "./Search";

export default class Navbar extends Component {
    render() {
        return (
            <div>
                <Logo/>
                <Search/>
            </div>
        )
    }
}