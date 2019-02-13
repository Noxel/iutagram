import React, {Component} from 'react';
import { connect } from 'react-redux';
import { modalOpen } from "../../../actions";

import { Dialog,DialogContent } from '@material-ui/core/';

class ModalImage extends Component {
    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={()=> {this.props.dispatch(modalOpen())}}
                aria-labelledby="form-dialog-title"
            >
                <DialogContent>
                    lul
                </DialogContent>
            </Dialog>
        )
    }
}
const mapStateToProps = state => ({
    open: state.modalOpen
});

export default connect(mapStateToProps)(ModalImage);