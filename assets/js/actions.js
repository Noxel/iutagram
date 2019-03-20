import "@babel/polyfill";
import Actuality from "./Component/Body/Actuality";
const adresse = '/api';
export const ERROR = 'ERROR';
export const PROFILE = 'PROFILE';
export const FORMCONNEXION ='FORMCONNEXION';
export const CONNEXION = 'CONNEXION';
export const DECONNEXION ='DECONNEXION';
export const CONNEXION_ERROR = 'CONNEXION_ERROR';
export const MODAL_IMAGE = 'MODAL_IMAGE';
export const IMAGE_LOAD = 'IMAGE_LOAD';
export const ACTUALITY_LOAD ='ACTUALITY_LOAD';

export const loadUser = ( id ) => async (dispatch, state) => {
    let param=id;
    if(param==='me')param =state().token.payload.id;
    try {
        let rep = await fetch(adresse + '/users/' + param, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            }
        });
        let json = await rep.json();
        dispatch({type: PROFILE, profile: json})
    }catch (e) {
        dispatch({type: ERROR, error: e.toString()});
    }
};

export const formOpen = () => dispatch => {
    try{
        dispatch({type: FORMCONNEXION})
    } catch (e) {
        dispatch({type: ERROR, error: e.toString()});
    }
};

export const modalOpen = (id) => dispatch => {
    try{
        dispatch({type: MODAL_IMAGE, id: id})
    } catch (e) {
        dispatch({type: ERROR, error: e.toString()});
    }
};

export const connexion = (username, password) => async dispatch => {
    try {
        let rep = await fetch(adresse + '/login_check' , {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({username, password}),
        });
        if(200 === rep.status){
            let json = await rep.json();
            let token = decodeJWT(json.token);
            localStorage.setItem('jwt', JSON.stringify(token));
            dispatch({type: CONNEXION, token: token});
        } else {
            dispatch({type: CONNEXION_ERROR, error: 'ConnexionFail'});
        }
    } catch (e) {
        dispatch({type: ERROR, error: e.toString()});
    }
};

export const deconnexion = () => dispatch => {
    try {
        localStorage.clear();
        dispatch({type: DECONNEXION});
    }catch (e) {
        dispatch({type: ERROR, error: e.toString()});
    }
};

const decodeJWT = raw => {
    const parts = raw.split('.');
    return {
        rawToken: raw,
        headers: JSON.parse(atob(parts[0])),
        payload: JSON.parse(atob(parts[1])),
        signature: parts[2],
    };
};

export const loadImage = (id) => async dispatch => {
    try{
        let rep = await fetch(adresse + '/images/' + id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            }
        });
        let json = await rep.json();
        dispatch({type: IMAGE_LOAD, image: json});
    } catch (e) {
        dispatch({type: ERROR, error: e.toString()});
    }
};

export const loadActuality = () => async (dispatch, state) => {
    try{
        let rep = await fetch(adresse + '/users/' + state().token.payload.id+'/actuality', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: "Bearer " + state().token.rawToken
            }
        });
        let json = await rep.json();
        dispatch({type: ACTUALITY_LOAD, actuality: json.actuality});
    } catch (e) {
        dispatch({type: ERROR, error: e.toString()});
    }
};