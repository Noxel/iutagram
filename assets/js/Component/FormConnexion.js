import React, {Component} from 'react';
import { connect } from 'react-redux';
import {connexion, formOpen} from "../actions";

import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@material-ui/core/';

class FormConnexion extends Component {
    render() {
        let password;
        let username;
        return (
           <Dialog
               open={this.props.open}
               onClose={()=> {this.props.dispatch(formOpen())}}
               aria-labelledby="form-dialog-title"
           >
               <DialogTitle id={"form-dialog-title"}>Connexion</DialogTitle>
               <DialogContent>
                   <TextField
                    autoFocus
                    margin={"dense"}
                    id={"username"}
                    label={"Username"}
                    type={"username"}
                    inputRef={node => username = node}
                    />
                   <TextField
                       margin={"dense"}
                       id={"password"}
                       label={"Password"}
                       type={"password"}
                       inputRef={node => password = node}
                   />
               </DialogContent>
               <DialogActions>
                   <Button onClick={()=>{this.props.dispatch(formOpen())}} color={"secondary"}> Cancel </Button>
                   <Button onClick={()=>{this.props.dispatch(connexion(username.value, password.value))}} color={"primary"}>Connexion</Button>
               </DialogActions>
           </Dialog>
        )
    }
}
const mapStateToProps = state => ({
    open: state.formOpen
});

export default connect(mapStateToProps)(FormConnexion);