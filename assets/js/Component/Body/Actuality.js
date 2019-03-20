import React, {Component} from 'react';
import { connect } from 'react-redux';
import {  loadActuality} from "../../actions";
import Image from "./Elements/Image";
import {GridList} from '@material-ui/core';
import ModalImage from "./Elements/ModalImage";

class Actuality extends Component {

    componentDidMount(){
        this.props.dispatch(loadActuality());
    }

    render() {
        return (
            <div>
                <GridList  cols={3} cellHeight={200}>
                    {this.props.actuality.map( item=> (
                        <Image key={item.id} src={item.path} like={item.like} comment={item.comment} id={item.id}/>
                    ))}
                </GridList>
                <ModalImage/>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    actuality: state.actuality
});

const styles = {
    avatar: {
        margin: 10,
        width: 150,
        height: 150,
    },
};


export default connect(mapStateToProps)(Actuality);