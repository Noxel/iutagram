import "@babel/polyfill";
const adresse = '/api';
export const ERROR = 'ERROR';
export const PROFILE = 'PROFILE';
export const FORMCONNEXION ='FORMCONNEXION';
export const CONNEXION = 'CONNEXION';
export const DECONNEXION ='DECONNEXION';
export const CONNEXION_ERROR = 'CONNEXION_ERROR';
export const MODAL_IMAGE = 'MODAL_IMAGE';

export const loadUser = ( id ) => async dispatch => {
    try {
        let rep = await fetch(adresse + '/users/' + id, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            }
        });
        let json = await rep.json();
        console.log(json);
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

export const modalOpen = () => dispatch => {
    try{
        dispatch({type: MODAL_IMAGE})
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