import React, {Component} from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { connect } from 'react-redux';
import {deconnexion, formOpen} from "../../actions";

class Connexion extends Component {

    render() {
        return (
            <FormControlLabel control={<Switch checked={this.props.auth} onChange={()=> {this.props.auth ? this.props.dispatch(deconnexion()) : this.props.dispatch(formOpen())}}/>} label={this.props.auth? 'Deconnexion' : 'Connexion'}/>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Connexion);