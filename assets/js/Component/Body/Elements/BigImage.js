import React, {Component} from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {withStyles, CardMedia, Avatar, Divider, List, ListItem, ListItemText,Button, Typography, Link} from '@material-ui/core';
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
                            <Link href={"/profile/"+this.props.image.owner.id} style={{marginRight:' 10px'}}>
                                <Avatar
                                    alt={this.props.image.owner.username}
                                    src={this.props.image.owner.avatar ? this.props.image.owner.avatar : defaultAvatar}
                                    className={classes.avatar}
                                />
                            </Link>
                            <p><Typography component={Link} href={"/profile/"+this.props.image.owner.id} color="textPrimary"> <b>{this.props.image.owner.username}</b></Typography></p>

                            <Button style={{color: 'blue', marginLeft:'10px'}}> Follow </Button>
                        </div>
                        <Divider variant={'middle'}/>
                        <List className={classes.list} disablePadding={true} >
                            {this.props.image.comments.map((item, index)=>(
                                <ListItem  dense={true} key={index} disableGutters={true}>
                                    <ListItemText className={classes.text}

                                    secondary={<><Typography component={Link} href={"/profile/"+item.owner.id} className={classes.inline} color="textPrimary">
                                        {item.owner.username}
                                    </Typography> {item.text}</>}/>
                                </ListItem>
                            ))}
                        </List>
                        <Divider variant={'middle'}/>
                        <div className={classes.footer}>
                            <ListItem  dense={true}  disableGutters={true}>
                                <ListItemText className={classes.text}
                                              primary={this.props.image.like+ ' j\'aimes'}/>
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
        flexDirection: 'row',
        marginBottom: '10px'
    },
    list :{
        flex: 1,
        overflowY: 'scroll',
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