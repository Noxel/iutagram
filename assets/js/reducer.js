import {CONNEXION, DECONNEXION, ERROR, FORMCONNEXION, PROFILE, MODAL_IMAGE} from "./actions";

const initialReducer = {
    error: '',
    auth: false,
    token: {},
    formOpen: false,
    modalOpen: false,
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
        case FORMCONNEXION :
            return {...state, formOpen : !state.formOpen};
        case MODAL_IMAGE :
            return {...state, formOpen : !state.modalOpen};
        case CONNEXION :
            return {...state,  formOpen : false, token: actions.token, auth: true};
        case DECONNEXION :
            return {...state, auth: false, jwt: {}};
        default :
            return {...state};
    }
};

export {reducer};