import React, {Component} from 'react';
import { connect } from 'react-redux';
import { loadUser } from "../../actions";
import Image from "./Elements/Image";

class Profile extends Component {

    componentDidMount(){
        this.props.dispatch(loadUser(31));
    }

    render() {
        return (
            <div>
                <h1> {this.props.profile.username}</h1>

                <div className={'container'}>
                    {this.props.profile.images.map( item=> (
                        <Image key={item.id} src={item.path} like={item.like} comment={item.comment}/>
                    ))}
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    profile: state.profile
});


export default connect(mapStateToProps)(Profile);