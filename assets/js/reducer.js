import {CONNEXION, DECONNEXION, ERROR, FORMCONNEXION, PROFILE, MODAL_IMAGE, IMAGE_LOAD, ACTUALITY_LOAD} from "./actions";

const initialReducer = {
    error: '',
    auth: false,
    token: {},
    formOpen: false,
    modalOpen: false,
    idImage: '',
    profile : {
        images: []
    },
    image : {
        comments : [],
        owner: {}
    },
    actuality : [],

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
            return {...state, modalOpen : !state.modalOpen, idImage: actions.id};
        case IMAGE_LOAD :
            return {...state, image: actions.image};
        case ACTUALITY_LOAD:
            return {...state, actuality: actions.actuality}
        case CONNEXION :
            return {...state,  formOpen : false, token: actions.token, auth: true};
        case DECONNEXION :
            return {...state, auth: false, jwt: {}};
        default :
            return {...state};
    }
};

export {reducer};