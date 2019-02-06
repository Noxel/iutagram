import { ERROR, PROFILE } from "./actions";

const initialReducer = {
    error: '',
    profile : {
        images: []
    }
};

const reducer = (state = initialReducer, actions) => {
    switch (actions.type) {
        case ERROR :
            return {...state, error: actions.error};
        case PROFILE :
            return {...state, profile: actions.profile };
        default :
            return {...state};
    }
};

export {reducer};