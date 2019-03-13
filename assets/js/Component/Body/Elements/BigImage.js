import React, {Component} from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {withStyles, CardMedia, Avatar, Divider, List, ListItem, ListItemText, Typography} from '@material-ui/core';
import Chat from '@material-ui/icons/Chat';
import Stars from '@material-ui/icons/Star';
import { loadImage } from '../../../actions';
import defaultAvatar from "../../../image/avatar.jpg";


class BigImage extends Component {

    componentDidMount(){
        this.props.dispatch(loadImage(this.props.id));
    }

    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.card} >
                <CardMedia component='img' className={classes.cover} src={this.props.image.path}/>
                <CardContent className={classes.details} >
                    <div className={classes.container}>
                        <div className={classes.head}>
                            <Avatar
                                alt={this.props.image.owner.username}
                                src={this.props.image.owner.avatar ? this.props.image.owner.avatar : defaultAvatar}
                                className={classes.avatar}
                                style={{marginRight:' 25px'}}
                            />
                            <p><b>{this.props.image.owner.username} </b> </p>
                            <p style={{color: 'blue'}}> Follow </p>
                        </div>
                        <Divider variant={'middle'}/>
                        <List className={classes.list} disablePadding={true} >
                            {this.props.image.comments.map((item, index)=>(
                                <ListItem  dense={true} key={index} disableGutters={true}>
                                    <ListItemText className={classes.text}

                                    secondary={<><Typography component="span" className={classes.inline} color="textPrimary">
                                        {item.owner.username}
                                    </Typography> {item.text}</>}/>
                                </ListItem>
                            ))}
                        </List>
                        <div className={classes.footer}>
                            <ListItem  dense={true}  disableGutters={true}>
                                <ListItemText className={classes.text}
                                              primary={this.props.image.like+ 'j\'aime'}/>
                            </ListItem>
                            <ListItem  dense={true} disableGutters={true}>
                                <ListItemText className={classes.text}
                                              primary={new Date(this.props.image.date).getDate()+'/'+new Date(this.props.image.date).getMonth()+'/'+new Date(this.props.image.date).getFullYear()}/>
                            </ListItem>
                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    }
}

const mapStateToProps = state => ({
    id: state.idImage,
    image: state.image,
});

const styles  = {
    card: {
        display: 'flex',
    },
    details: {
        flex:1
    },
    cover: {
        flex: 6,
    },
    container :{
        display: 'flex',
        flexDirection: 'column'
    },
    head :{
        flex: 1,
        display: 'flex',
        flexDirection: 'row'
    },
    list :{
        flex: 1,
        overflow: 'scroll',
        maxWidth: 400,
        maxHeight: 300,
    },
    inline: {
        display: 'inline',
    },
    footer:{
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    }

};

export default withStyles(styles)(connect(mapStateToProps)(BigImage));