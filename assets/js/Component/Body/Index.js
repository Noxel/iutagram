import React, {Component} from 'react';
import { connect } from 'react-redux';
import {connexion, formOpen} from "../../actions";

import { withStyles,TextField, Button, Card, DialogTitle, DialogContent, CardActions } from '@material-ui/core/';

class Index extends Component {
    render() {
        const {classes} = this.props;
        let password;
        let username;
        return (<div className={classes.container}>
                    <Card className={classes.form}>
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
                <CardActions>
                    <Button onClick={()=>{this.props.dispatch(formOpen())}} color={"secondary"}> Cancel </Button>
                    <Button onClick={()=>{this.props.dispatch(connexion(username.value, password.value))}} color={"primary"}>Connexion</Button>
                </CardActions>
                    </Card>
            </div>

        )
    }
}
const mapStateToProps = state => ({
    open: state.formOpen
});


const styles = {
    form: {
      margin: 'auto',
      marginTop: '10%'
    },
    container: {
        display: 'flex',
    }
};

export default withStyles(styles)(connect(mapStateToProps)(Index));