import React, {Component} from 'react';
import logo from '../../image/logoIutagram.png'

export default class Logo extends Component {
    render() {
        return (
            <div>
                <img src={logo}/>
            </div>
        )
    }
}