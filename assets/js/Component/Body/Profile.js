import React, {Component} from 'react';
import { connect } from 'react-redux';
import { loadUser } from "../../actions";
import Image from "./Elements/Image";
import defaultAvatar from '../../image/avatar.jpg'
import {Avatar, withStyles, Grid, GridList} from '@material-ui/core';
import ModalImage from "./Elements/ModalImage";

class Profile extends Component {

    componentDidMount(){
        this.props.dispatch(loadUser(3));
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Grid container justify={"center"} style={{margin: '20px'}} >
                    <Avatar
                        alt={this.props.profile.username}
                        src={this.props.profile.avatar ? this.props.profile.avatar : defaultAvatar}
                        className={classes.avatar}
                        style={{marginRight:' 25px'}}
                    />
                    <Grid item style={{marginLeft:' 25px'}} >
                        <h1>{this.props.profile.username}</h1>
                        <Grid item >
                            <div><b>{this.props.profile.post}</b> Post </div>
                            <div><b>{this.props.profile.nbFollower} </b> Follower </div>
                            <div><b>{this.props.profile.nbUserFollowed}</b> Following </div>
                        </Grid>
                    </Grid>

                </Grid>
                <GridList  cols={3} cellHeight={200}>
                    {this.props.profile.images.map( item=> (
                        <Image key={item.id} src={item.path} like={item.like} comment={item.comment} id={item.id}/>
                    ))}
                </GridList>
                <ModalImage/>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    profile: state.profile
});

const styles = {
    avatar: {
        margin: 10,
        width: 150,
        height: 150,
    },
};


export default withStyles(styles)(connect(mapStateToProps)(Profile));