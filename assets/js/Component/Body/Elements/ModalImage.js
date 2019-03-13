import React, {Component} from 'react';
import { connect } from 'react-redux';
import { modalOpen } from "../../../actions";
import BigImage from './BigImage';

import { Dialog } from '@material-ui/core/';

class ModalImage extends Component {
    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={()=> {this.props.dispatch(modalOpen())}}
                fullWidth={true}
                maxWidth = {'md'}
            >
                    <BigImage/>
            </Dialog>
        )
    }
}
const mapStateToProps = state => ({
    open: state.modalOpen
});

export default connect(mapStateToProps)(ModalImage);