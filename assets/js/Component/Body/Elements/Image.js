import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chat from '@material-ui/icons/Chat';
import Stars from '@material-ui/icons/Star';


export default class Image extends Component {
    render() {
        return (
            <Card className={'imageContainer'} onClick={()=>{}}>
                <img  className={'image'} src={this.props.src}/>
                <CardContent className={'middle'}>
                    <div className={'imageText'}>
                        <div><Stars/> {this.props.like}</div><div><Chat/> {this.props.comment}</div>
                    </div>
                </CardContent>
            </Card>
        )
    }
}