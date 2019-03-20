import React, {Component} from 'react';
import logo from '../../image/logoIutagram.png'
import { Link } from "react-router-dom";

export default class Logo extends Component {
    render() {
        return (
                <Link to="/actuality">
                    <img src={logo} />
                </Link>
        )
    }
}