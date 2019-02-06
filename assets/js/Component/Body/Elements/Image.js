import React, {Component} from 'react';

export default class Image extends Component {
    render() {
        return (
            <div className={'imageContainer'}>
                <img  className={'image'} src={this.props.src}/>
                <div className={'middle'}>
                    <div className={'imageText'}>
                        &#128151; {this.props.like} &#9997; {this.props.comment}
                    </div>
                </div>
            </div>
        )
    }
}